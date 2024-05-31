export const contractAbiV2 = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player1",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct inEbool",
				"name": "_encryptedMove",
				"type": "tuple"
			}
		],
		"name": "accept",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player2",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct inEbool",
				"name": "_encryptedMove",
				"type": "tuple"
			}
		],
		"name": "challenge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player1",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "player2",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "gameId",
				"type": "bytes32"
			}
		],
		"name": "GameChallenged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player2",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "player1",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "gameId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "player1ScoreDiff",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "player2ScoreDiff",
				"type": "int256"
			}
		],
		"name": "GameCompleted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "gameCounters",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "games",
		"outputs": [
			{
				"internalType": "address",
				"name": "player1",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "player2",
				"type": "address"
			},
			{
				"internalType": "ebool",
				"name": "player1Move",
				"type": "uint256"
			},
			{
				"internalType": "ebool",
				"name": "player2Move",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "plainTextPlayer1Move",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "plainTextPlayer2Move",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "gameCompleted",
				"type": "bool"
			},
			{
				"internalType": "int256",
				"name": "player1ScoreDiff",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "player2ScoreDiff",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "getAllGamesForAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "player1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player2",
						"type": "address"
					},
					{
						"internalType": "ebool",
						"name": "player1Move",
						"type": "uint256"
					},
					{
						"internalType": "ebool",
						"name": "player2Move",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "plainTextPlayer1Move",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "plainTextPlayer2Move",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "gameCompleted",
						"type": "bool"
					},
					{
						"internalType": "int256",
						"name": "player1ScoreDiff",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "player2ScoreDiff",
						"type": "int256"
					}
				],
				"internalType": "struct Dilemma_v2.Game[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player1",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_player2",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "counter",
				"type": "uint256"
			}
		],
		"name": "getGame",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "player1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player2",
						"type": "address"
					},
					{
						"internalType": "ebool",
						"name": "player1Move",
						"type": "uint256"
					},
					{
						"internalType": "ebool",
						"name": "player2Move",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "plainTextPlayer1Move",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "plainTextPlayer2Move",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "gameCompleted",
						"type": "bool"
					},
					{
						"internalType": "int256",
						"name": "player1ScoreDiff",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "player2ScoreDiff",
						"type": "int256"
					}
				],
				"internalType": "struct Dilemma_v2.Game",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "playerGames",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]