import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import type { Analysis } from '@/lib/types'

const DATA_FILE = path.join(process.cwd(), 'data', 'analyses.json')

function ensureDataFile(): void {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8')
  }
}

function readAnalyses(): Analysis[] {
  ensureDataFile()
  const raw = fs.readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw) as Analysis[]
}

function writeAnalyses(analyses: Analysis[]): void {
  ensureDataFile()
  fs.writeFileSync(DATA_FILE, JSON.stringify(analyses, null, 2), 'utf-8')
}

// GET — return all analyses
export async function GET() {
  try {
    const analyses = readAnalyses()
    return NextResponse.json(analyses)
  } catch (err) {
    console.error('GET analyses error:', err)
    return NextResponse.json({ error: 'Failed to read analyses.' }, { status: 500 })
  }
}

// POST — add new analysis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Partial<Analysis>
    if (!body.inputs || !body.calculations) {
      return NextResponse.json({ error: 'inputs and calculations are required.' }, { status: 400 })
    }

    const now = new Date().toISOString()
    const newAnalysis: Analysis = {
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      inputs: body.inputs,
      calculations: body.calculations,
      aiAnalysis: body.aiAnalysis ?? null,
      notes: body.notes ?? '',
    }

    const analyses = readAnalyses()
    analyses.push(newAnalysis)
    writeAnalyses(analyses)

    return NextResponse.json(newAnalysis, { status: 201 })
  } catch (err) {
    console.error('POST analyses error:', err)
    return NextResponse.json({ error: 'Failed to save analysis.' }, { status: 500 })
  }
}

// PUT — update existing analysis
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json() as { id?: string; updates?: Partial<Analysis> }
    if (!body.id || !body.updates) {
      return NextResponse.json({ error: 'id and updates are required.' }, { status: 400 })
    }

    const analyses = readAnalyses()
    const index = analyses.findIndex((a) => a.id === body.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Analysis not found.' }, { status: 404 })
    }

    analyses[index] = {
      ...analyses[index],
      ...body.updates,
      id: body.id,
      updatedAt: new Date().toISOString(),
    }

    writeAnalyses(analyses)
    return NextResponse.json(analyses[index])
  } catch (err) {
    console.error('PUT analyses error:', err)
    return NextResponse.json({ error: 'Failed to update analysis.' }, { status: 500 })
  }
}

// DELETE — remove analysis by id
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json() as { id?: string }
    if (!body.id) {
      return NextResponse.json({ error: 'id is required.' }, { status: 400 })
    }

    const analyses = readAnalyses()
    const filtered = analyses.filter((a) => a.id !== body.id)

    if (filtered.length === analyses.length) {
      return NextResponse.json({ error: 'Analysis not found.' }, { status: 404 })
    }

    writeAnalyses(filtered)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE analyses error:', err)
    return NextResponse.json({ error: 'Failed to delete analysis.' }, { status: 500 })
  }
}
