export enum EXCEPTION_LEVEL {
  NORMAL = 'NORMAL',
  PANIC = 'PANIC',
}

export enum EXCEPTION_CODE {
  /**********************
   * 노드 에러
   **********************/
  ERR1001 = 'Unknown exception',
  ERR1002 = 'missing response',
  ERR1003 = 'ETIMEDOUT',
  ERR1004 = 'could not detect network',
  ERR1005 = 'Expected rpc error',
  ERR1006 = 'Validation error',
  ERR1007 = 'missing revert data in call exception',
  ERR1009 = 'Too Many Requests', // url: 'https://rpc-mainnet.maticvigil.com/', RPC request rate limit
  ERR1010 = 'processing response error',
  ERR1011 = 'underlying network changed', // avalanche node<https://api.avax.network/ext/bc/C/rpc>

  /**********************
   * Mysql 데이터 베이스 에러
   **********************/
  ERR1008 = 'Too many connections',

  /**********************
   * 커스텀 에러
   **********************/
  // 스케줄러 미확인
  ERR1000 = 'Not found scheduler',

  // 네트워크 미확인
  ERR3000 = 'Unregistered or Disabled network',
  // 프로토콜 미확인
  ERR3001 = 'Unregistered or Disabled protocol',

  // 토큰 가격 오라클 타입이 체인링크일 경우, 오라클 데이터에 feed값 필수
  ERR2000 = 'chain link oracle type requires "feed" in oracle data',
  // NFT 작업일 경우, Config에 path값 필수
  ERR2001 = 'nft task requires "path" in task config',
}
