import gpt3_encoding from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { init as _init, Tiktoken } from '@dqbd/tiktoken/lite/init';
import type { SafeParse } from '@/types';
import { ChatGPTMessage } from '@/features/chat/types';
import { numTokensFromMessages, numTokensFromText } from '@/utils/openai/tokenCounter';

export namespace TiktokenLite {
  type InitResponse = SafeParse<{
    encoder: Tiktoken;
    getNumTokensFromMessages: (messages: ChatGPTMessage[]) => Promise<number>;
    getNumTokensFromText: (text: string) => Promise<number>;
  }>;
  export async function init(wasm: BufferSource): Promise<InitResponse> {
    try {
      await _init((imports) => WebAssembly.instantiate(wasm, imports));

      const encoder = new Tiktoken(
        gpt3_encoding.bpe_ranks,
        gpt3_encoding.special_tokens,
        gpt3_encoding.pat_str
      );

      return {
        success: true,
        error: null,
        data: {
          encoder,
          getNumTokensFromMessages: (messages: ChatGPTMessage[]) => {
            return numTokensFromMessages(messages, encoder);
          },
          getNumTokensFromText: (text: string) => {
            return numTokensFromText(text, encoder);
          },
        },
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        error: e,
        data: null,
      };
    }
  }
}
