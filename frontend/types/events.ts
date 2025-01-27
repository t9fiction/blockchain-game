export type GameResultEvent = {
  args: {
    player: string;
    guess: bigint;
    reward: bigint;
    winType: string;
  };
};
  
  export type GameResultLog = {
    args: GameResultEvent;
    eventName: 'GameResult';
    address: string;
    blockHash: string;
    blockNumber: bigint;
    data: string;
    logIndex: number;
    removed: boolean;
    topics: string[];
    transactionHash: string;
    transactionIndex: number;
  };

  