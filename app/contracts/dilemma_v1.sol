// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Dilemma {
    struct Game {
        address player1;
        address player2;
        bool player1Move;
        bool player2Move;
        bool gameCompleted;
        int player1ScoreDiff;
        int player2ScoreDiff;
    }

    mapping(bytes32 => Game) public games;
    mapping(bytes32 => uint256) public gameCounters;
    mapping(address => bytes32[]) public playerGames; // New mapping to track game IDs by player

    event GameChallenged(address indexed player1, address indexed player2, bytes32 gameId);
    event GameCompleted(address indexed player2, address indexed player1, bytes32 gameId, int player1ScoreDiff, int player2ScoreDiff);
    function computePairId(address _player1, address _player2) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_player1, _player2));
    }

    function computeGameId(address _player1, address _player2, uint256 counter) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_player1, _player2, counter));
    }

    function challenge(address _player2, bool _move) external {
        require(_player2 != msg.sender, "You cannot challenge yourself");

        bytes32 pairId = computePairId(msg.sender, _player2);
        uint256 counter = gameCounters[pairId];

        // Check if there's an open game
        bytes32 gameId = computeGameId(msg.sender, _player2, counter);
        Game storage game = games[gameId];
        require(game.gameCompleted || game.player1 == address(0), "An open game already exists between these players");

        // Create a new game if no open game exists
        gameCounters[pairId]++;
        gameId = computeGameId(msg.sender, _player2, gameCounters[pairId]);

        games[gameId] = Game({
            player1: msg.sender,
            player2: _player2,
            player1Move: _move,
            player2Move: false,
            gameCompleted: false,
            player1ScoreDiff: 0,
            player2ScoreDiff: 0
        });

        playerGames[msg.sender].push(gameId);
        playerGames[_player2].push(gameId);

        emit GameChallenged(msg.sender, _player2, gameId);
    }

    function accept(address _player1, bool _move) external returns (int) {
        bytes32 pairId = computePairId(_player1, msg.sender);
        uint256 counter = gameCounters[pairId];

        bytes32 gameId = computeGameId(_player1, msg.sender, counter);
        Game storage game = games[gameId];

        require(game.player1 == _player1, "Invalid player1 address");
        require(game.player2 == msg.sender, "You are not the challenged player");
        require(!game.gameCompleted, "Game already completed");

        game.player2Move = _move;
    

        if (game.player1Move && _move) {
            game.player1ScoreDiff = 1;
            game.player2ScoreDiff = 1;
        } else if (game.player1Move && !_move) {
            game.player1ScoreDiff = -1;
            game.player2ScoreDiff = 1;
        } else if (!game.player1Move && _move) {
            game.player1ScoreDiff = 1;
            game.player2ScoreDiff = -1;
        } else {
            game.player1ScoreDiff = 0;
            game.player2ScoreDiff = 0;

        }

        game.gameCompleted = true;

        emit GameCompleted(msg.sender, _player1, gameId, game.player1ScoreDiff, game.player2ScoreDiff);

        return game.player2ScoreDiff;
    }

    function getGame(address _player1, address _player2, uint256 counter) external view returns (Game memory) {
        bytes32 gameId = computeGameId(_player1, _player2, counter);
        return games[gameId];
    }

    function getAllGamesForAddress(address player) external view returns (Game[] memory) {
        bytes32[] memory gameIds = playerGames[player];
        uint256 totalGames = gameIds.length;

        Game[] memory allGames = new Game[](totalGames);
        for (uint256 i = 0; i < totalGames; i++) {
            allGames[i] = games[gameIds[i]];
        }

        return allGames;
    }
}