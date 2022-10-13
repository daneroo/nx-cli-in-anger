import { promises as fs } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { parseFile } from 'music-metadata'

export interface FileInfo {
  path: string
  basename: string
  dirname: string
  size: number
}

export interface BasicMetadata {
  artist: string
  title: string
  album: string
  duration: number
  bitrate: number
}

// use node:fs to read the file size
export async function getSizeOfFile(filepath: string): Promise<FileInfo> {
  const stats = await fs.stat(filepath)
  const absPath = resolve(filepath)
  return {
    path: absPath,
    basename: basename(filepath),
    dirname: dirname(absPath),
    size: stats.size,
  }
}

// use music-metadata to get the metadata from an mp3 file
export async function getMeta(filePath: string): Promise<BasicMetadata> {
  const metadata = await parseFile(filePath)
  const { artist, title, album } = metadata.common
  const { bitrate, duration } = metadata.format
  return {
    artist: artist ?? 'unknown artist',
    title: title ?? 'unknown title',
    album: album ?? 'unknown album',
    duration: duration ?? 0,
    bitrate: bitrate ?? 0,
  }
}
