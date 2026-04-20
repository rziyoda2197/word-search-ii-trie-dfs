class TrieNode {
    constructor() {
        this.children = {};
        this.word = null;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.word = word;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.word !== null;
    }
}

function findWords(board, words) {
    let trie = new Trie();
    for (let word of words) {
        trie.insert(word);
    }

    let rows = board.length;
    let cols = board[0].length;
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));

    function dfs(node, row, col, word) {
        if (node.word !== null) {
            words.push(node.word);
            node.word = null;
        }

        visited[row][col] = true;
        for (let direction of directions) {
            let newRow = row + direction[0];
            let newCol = col + direction[1];
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited[newRow][newCol] && board[newRow][newCol] === node.children[board[newRow][newCol]].word) {
                dfs(node.children[board[newRow][newCol]], newRow, newCol, word + board[newRow][newCol]);
            }
        }
        visited[row][col] = false;
    }

    let result = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (trie.search(board[row][col])) {
                dfs(trie.root.children[board[row][col]], row, col, board[row][col]);
            }
        }
    }
    return result;
}
```

Kodda, `TrieNode` klassi so'zlar uchun treenodlarni saqlash uchun ishlatiladi. `Trie` klassi treenodlarni yaratish, so'zlar qo'shish va so'zlar mavjudligini tekshirish uchun ishlatiladi. `findWords` funksiyasi gridda berilgan so'zlar ro'yxatini topish uchun ishlatiladi. U gridni tekshirib, har bir so'zni topish uchun DFS algoritmasidan foydalanadi.
