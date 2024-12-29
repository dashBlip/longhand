import fs from 'fs/promises'
import path from 'path'

interface Poem {
  title: string
  content: string
  meaning: string
}

interface PoemCollection {
  [key: string]: Poem[]
}

export async function parsePoems(): Promise<PoemCollection> {
  const filePath = path.join(process.cwd(), 'public', 'poems.txt')
  const fileContent = await fs.readFile(filePath, 'utf-8')

  const collections: PoemCollection = {}
  let currentCollection = ''
  let currentPoem: Partial<Poem> = {}

  const lines = fileContent.split('\n')

  for (const line of lines) {
    if (line.startsWith('[') && line.endsWith(']')) {
      currentCollection = line.slice(1, -1)
      collections[currentCollection] = []
    } else if (line.startsWith('Title: ')) {
      if (currentPoem.title) {
        collections[currentCollection].push(currentPoem as Poem)
        currentPoem = {}
      }
      currentPoem.title = line.replace('Title: ', '').trim()
    } else if (line.startsWith('Content:')) {
      currentPoem.content = ''
    } else if (line.startsWith('Meaning: ')) {
      currentPoem.meaning = line.replace('Meaning: ', '').trim()
    } else if (currentPoem.content !== undefined) {
      currentPoem.content += line.trim() + '\n'
    }
  }

  if (currentPoem.title) {
    collections[currentCollection].push(currentPoem as Poem)
  }

  return collections
}

