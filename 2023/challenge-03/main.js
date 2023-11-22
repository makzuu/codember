import { open } from 'node:fs/promises'

const fileName = 'encryption_policies.txt'

const file = await open(fileName)
const data = await file.readFile({ encoding: 'utf-8' })

await file.close()

function count(letter, str) {
    let count = 0
    for (const char of str) {
        if (char === letter) {
            count++
        }
    }
    return count
}

function extract(pair) {
    let min, max, letter, key
    let buff = ''
    for (const char of pair) {
        if (min === undefined) {
            if (char !== '-') {
                buff += char
            } else {
                min = buff
                buff = ''
            }
        } else if (max === undefined) {
            if (char !== ' ') {
                buff += char
            } else {
                max = buff
                buff = ''
            }
        } else if (letter === undefined) {
            letter = char
        } else {
            buff += char
        }
        key = buff.slice(2)
    }

    return [min, max, letter, key]
}

const pairs = data.split('\n')
const invalid_keys = []

for (const pair of pairs) {
    const [min, max, letter, key] = extract(pair)

    const times = count(letter, key)
    if (times > max || times < min) {
        invalid_keys.push(key)
    }
}

const PASSWORD_NUMBER = 13

for (let i = 0; i < invalid_keys.length; i++) {
    if (i + 1 === PASSWORD_NUMBER) {
        console.log(invalid_keys[i])
    }
}
