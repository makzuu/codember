import { open } from 'node:fs/promises'

const fileName = 'message_01.txt'

const file = await open(fileName)
const data = await file.readFile({ encoding: 'utf-8' })

await file.close()

const words = data.trim().split(' ')
const count = {}

for (const word of words) {
    const wordLower = word.toLowerCase()

    if (count[wordLower]) {
        count[wordLower]++
    } else {
        count[wordLower] = 1
    }
}

let result = ''

for (const key in count) {
    result += (key + count[key])
}

console.log(result)
