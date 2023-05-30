// -------------------------------------------------------------------------- //
//-                                TOKEN TOOLS                               -//
// -------------------------------------------------------------------------- //
import type { ChatGPTMessage } from '@/features/chat/types';
import type { Tiktoken } from '@dqbd/tiktoken/lite/tiktoken';
/* -------------------------------------------------------------------------- */

export async function numTokensFromMessages(messages: ChatGPTMessage[], encoder: Tiktoken) {
  let numTokens = 0;
  for (const message of messages) {
    numTokens += 4;
    for (const [key, value] of Object.entries(message)) {
      numTokens += encoder.encode(value).length;
      if (key === 'name') {
        numTokens -= 1;
      }
    }
  }
  numTokens += 2;
  encoder.free();
  return numTokens;
}

export async function numTokensFromText(text: string, encoder: Tiktoken) {
  const tokensLen = encoder.encode(text).length;
  encoder.free();
  return tokensLen;
}
