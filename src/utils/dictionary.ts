import Taro from '@tarojs/taro'

/**
 * 获取 Free Dictionary API 的 URL
 * dictionaryapi.dev 支持 CORS，可以直接调用
 */
function getDictionaryApiUrl(word: string): string {
  return `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
}

/**
 * 从 Free Dictionary API 获取单词音标
 * https://dictionaryapi.dev/ - 完全免费，无需注册
 * @param word 单词
 * @returns 音标字符串，如果失败则返回null
 */
export async function fetchPhonetic(word: string): Promise<string | null> {
  if (!word || word.trim().length === 0) {
    return null
  }

  try {
    const response = await Taro.request({
      url: getDictionaryApiUrl(word.trim().toLowerCase()),
      method: 'GET',
    })

    if (response.statusCode === 200 && response.data && Array.isArray(response.data)) {
      const data = response.data as any[]

      // 遍历结果查找音标
      for (const entry of data) {
        // 优先获取顶层 phonetic
        if (entry.phonetic) {
          return entry.phonetic
        }

        // 从 phonetics 数组中查找
        if (entry.phonetics && Array.isArray(entry.phonetics)) {
          for (const p of entry.phonetics) {
            if (p.text) {
              return p.text
            }
          }
        }
      }
    }

    // 404 或其他错误状态码，静默返回 null
    return null
  } catch (error) {
    // 网络错误等，静默返回 null
    console.error('Failed to fetch phonetic:', error)
    return null
  }
}

/**
 * 检查单词并获取音标
 */
export async function checkWordAndGetPhonetic(word: string): Promise<string | null> {
  return await fetchPhonetic(word)
}
