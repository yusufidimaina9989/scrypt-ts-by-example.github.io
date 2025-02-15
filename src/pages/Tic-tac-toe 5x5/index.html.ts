// metadata
export const version = "0.1.0"
export const title = "Tic-Tac-Toe 5x5"
export const description = "Tic-Tac-Toe 5x5 in sCrypt"
export const replitLink = "https://replit.com/@yusufedresmaina/tictactoe5x5?embed=true"

const html = `<p>To initiate a game, Alice and Bob each lock up X amount of bitcoins into a contract UTXO. They take turns to play the game by sending signed transactions interacting with the <a href="https://scrypt.io/scrypt-ts/tutorials/stateful-contract">stateful contract</a>. If one of them wins, the winner claims the 2X bitcoins. If there is a draw, they take back their bitcoins.</p>
<pre><code class="language-ts"><span class="hljs-keyword">class</span> <span class="hljs-title class_">TicTacToe</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">SmartContract</span> {
  <span class="hljs-meta">@prop</span>()
  <span class="hljs-attr">alice</span>: <span class="hljs-title class_">PubKey</span>
  <span class="hljs-meta">@prop</span>()
  <span class="hljs-attr">bob</span>: <span class="hljs-title class_">PubKey</span>

  <span class="hljs-meta">@prop</span>(<span class="hljs-literal">true</span>)
  <span class="hljs-attr">is_alice_turn</span>: <span class="hljs-built_in">boolean</span>

  <span class="hljs-meta">@prop</span>(<span class="hljs-literal">true</span>)
  <span class="hljs-attr">board</span>: <span class="hljs-title class_">FixedArray</span>&lt;<span class="hljs-built_in">bigint</span>, <span class="hljs-number">25</span>&gt;

  <span class="hljs-meta">@prop</span>()
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">readonly</span> <span class="hljs-attr">TURNLEN</span>: <span class="hljs-built_in">bigint</span> = <span class="hljs-number">1n</span>
  <span class="hljs-meta">@prop</span>()
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">readonly</span> <span class="hljs-attr">BOARDLEN</span>: <span class="hljs-built_in">bigint</span> = <span class="hljs-number">25n</span>
  <span class="hljs-meta">@prop</span>()
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">readonly</span> <span class="hljs-attr">EMPTY</span>: <span class="hljs-built_in">bigint</span> = <span class="hljs-number">0n</span>
  <span class="hljs-meta">@prop</span>()
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">readonly</span> <span class="hljs-attr">ALICE</span>: <span class="hljs-built_in">bigint</span> = <span class="hljs-number">1n</span>
  <span class="hljs-meta">@prop</span>()
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">readonly</span> <span class="hljs-attr">BOB</span>: <span class="hljs-built_in">bigint</span> = <span class="hljs-number">2n</span>

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    alice: PubKey,
    bob: PubKey,
    is_alice_turn: <span class="hljs-built_in">boolean</span>,
    board: FixedArray&lt;<span class="hljs-built_in">bigint</span>, <span class="hljs-number">25</span>&gt;
  </span>) {
    <span class="hljs-variable language_">super</span>(alice, bob, is_alice_turn, board)
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">alice</span> = alice
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">bob</span> = bob
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">is_alice_turn</span> = is_alice_turn
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span> = board
  }

  <span class="hljs-meta">@method</span>()
  <span class="hljs-keyword">public</span> <span class="hljs-title function_">move</span>(<span class="hljs-params">n: <span class="hljs-built_in">bigint</span>, sig: Sig, amount: <span class="hljs-built_in">bigint</span></span>) {
    <span class="hljs-title function_">assert</span>(n &gt;= <span class="hljs-number">0n</span> &amp;&amp; n &lt; <span class="hljs-title class_">TicTacToe</span>.<span class="hljs-property">BOARDLEN</span>, <span class="hljs-string">"Field out of bounds"</span>)
    <span class="hljs-title function_">assert</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>[<span class="hljs-title class_">Number</span>(n)] == <span class="hljs-title class_">TicTacToe</span>.<span class="hljs-property">EMPTY</span>, <span class="hljs-string">"Field not empty"</span>)

    <span class="hljs-keyword">let</span> play = <span class="hljs-variable language_">this</span>.<span class="hljs-property">is_alice_turn</span> ? <span class="hljs-title class_">TicTacToe</span>.<span class="hljs-property">ALICE</span> : <span class="hljs-title class_">TicTacToe</span>.<span class="hljs-property">BOB</span>
    <span class="hljs-keyword">let</span> <span class="hljs-attr">player</span>: <span class="hljs-title class_">PubKey</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">is_alice_turn</span> ? <span class="hljs-variable language_">this</span>.<span class="hljs-property">alice</span> : <span class="hljs-variable language_">this</span>.<span class="hljs-property">bob</span>

    <span class="hljs-title function_">assert</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">checkSig</span>(sig, player), <span class="hljs-string">"Bad sig"</span>)
    <span class="hljs-comment">// make the move</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>[<span class="hljs-title class_">Number</span>(n)] = play
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">is_alice_turn</span> = !<span class="hljs-variable language_">this</span>.<span class="hljs-property">is_alice_turn</span>

    <span class="hljs-keyword">let</span> outputs = <span class="hljs-title function_">toByteString</span>(<span class="hljs-string">""</span>)
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">won</span>(play)) {
      <span class="hljs-keyword">let</span> outputScript = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildPublicKeyHashScript</span>(<span class="hljs-title function_">hash160</span>(player))
      <span class="hljs-keyword">let</span> output = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(outputScript, amount)
      outputs = output
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">full</span>()) {
      <span class="hljs-keyword">let</span> aliceScript = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildPublicKeyHashScript</span>(<span class="hljs-title function_">hash160</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">alice</span>))
      <span class="hljs-keyword">let</span> aliceOutput = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(aliceScript, amount)

      <span class="hljs-keyword">let</span> bobScript = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildPublicKeyHashScript</span>(<span class="hljs-title function_">hash160</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">bob</span>))
      <span class="hljs-keyword">let</span> bobOutput = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(bobScript, amount)

      outputs = aliceOutput + bobOutput
    } <span class="hljs-keyword">else</span> {
      outputs = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">buildStateOutput</span>(amount)
    }

    <span class="hljs-title function_">assert</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>.<span class="hljs-property">hashOutputs</span> == <span class="hljs-title function_">hash256</span>(outputs), <span class="hljs-string">"Output hashes don&#x27;t match"</span>)
  }

  <span class="hljs-meta">@method</span>()
  <span class="hljs-title function_">won</span>(<span class="hljs-attr">play</span>: <span class="hljs-built_in">bigint</span>): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">let</span> <span class="hljs-attr">lines</span>: <span class="hljs-title class_">FixedArray</span>&lt;<span class="hljs-title class_">FixedArray</span>&lt;<span class="hljs-title class_">BigInt</span>, <span class="hljs-number">5</span>&gt;, <span class="hljs-number">87</span>&gt; = [
           [0n, 1n, 2n, 3n, 4n],
            [1n, 2n, 3n, 4n, 5n],
            [2n, 3n, 4n, 5n, 6n],
            [5n, 6n, 7n, 8n, 9n],
            [6n, 7n, 8n, 9n, 10n],
            [7n, 8n, 9n, 10n, 11n],
            [10n, 11n, 12n, 13n, 14n],
            [11n, 12n, 13n, 14n, 15n],
            [12n, 13n, 14n, 15n, 16n],
            [15n, 16n, 17n, 18n, 19n],
            [16n, 17n, 18n, 19n, 20n],
            [17n, 18n, 19n, 20n, 21n],
            [20n, 21n, 22n, 23n, 24n],
            [21n, 22n, 23n, 24n, 25n],
            [22n, 23n, 24n, 25n, 26n],
            [25n, 26n, 27n, 28n, 29n],
            [26n, 27n, 28n, 29n, 30n],
            [27n, 28n, 29n, 30n, 31n],
            [30n, 31n, 32n, 33n, 34n],
            [31n, 32n, 33n, 34n, 35n],
            [32n, 33n, 34n, 35n, 36n],
            [35n, 36n, 37n, 38n, 39n],
            [36n, 37n, 38n, 39n, 40n],
            [37n, 38n, 39n, 40n, 41n],
            [40n, 41n, 42n, 43n, 44n],
            [41n, 42n, 43n, 44n, 45n],
            [42n, 43n, 44n, 45n, 46n],
            [45n, 46n, 47n, 48n, 49n],
            [46n, 47n, 48n, 49n, 50n],
            [47n, 48n, 49n, 50n, 51n],
            [50n, 51n, 52n, 53n, 54n],
            [51n, 52n, 53n, 54n, 55n],
            [52n, 53n, 54n, 55n, 56n],
        
            // Columns
            [0n, 5n, 10n, 15n, 20n],
            [5n, 10n, 15n, 20n, 25n],
            [10n, 15n, 20n, 25n, 30n],
            [15n, 20n, 25n, 30n, 35n],
            [20n, 25n, 30n, 35n, 40n],
            [25n, 30n, 35n, 40n, 45n],
            [30n, 35n, 40n, 45n, 50n],
            [35n, 40n, 45n, 50n, 55n],
            [40n, 45n, 50n, 55n, 60n],
            [1n, 6n, 11n, 16n, 21n],
            [6n, 11n, 16n, 21n, 26n],
            [11n, 16n, 21n, 26n, 31n],
            [16n, 21n, 26n, 31n, 36n],
            [21n, 26n, 31n, 36n, 41n],
            [26n, 31n, 36n, 41n, 46n],
            [31n, 36n, 41n, 46n, 51n],
            [36n, 41n, 46n, 51n, 56n],
            [41n, 46n, 51n, 56n, 61n],
            [2n, 7n, 12n, 17n, 22n],
            [7n, 12n, 17n, 22n, 27n],
            [12n, 17n, 22n, 27n, 32n],
            [17n, 22n, 27n, 32n, 37n],
            [22n, 27n, 32n, 37n, 42n],
            [27n, 32n, 37n, 42n, 47n],
            [32n, 37n, 42n, 47n, 52n],
            [37n, 42n, 47n, 52n, 57n],
            [42n, 47n, 52n, 57n, 62n],
            [3n, 8n, 13n, 18n, 23n],
            [8n, 13n, 18n, 23n, 28n],
            [13n, 18n, 23n, 28n, 33n],
            [18n, 23n, 28n, 33n, 38n],
            [23n, 28n, 33n, 38n, 43n],
            [28n, 33n, 38n, 43n, 48n],
            [33n, 38n, 43n, 48n, 53n],
            [38n, 43n, 48n, 53n, 58n],
            [43n, 48n, 53n, 58n, 63n],
            [4n, 9n, 14n, 19n, 24n],
            [9n, 14n, 19n, 24n, 29n],
            [14n, 19n, 24n, 29n, 34n],
            [19n, 24n, 29n, 34n, 39n],
            [24n, 29n, 34n, 39n, 44n],
            [29n, 34n, 39n, 44n, 49n],
            [34n, 39n, 44n, 49n, 54n],
            [39n, 44n, 49n, 54n, 59n],
            [44n, 49n, 54n, 59n, 64n],
            [5n, 10n, 15n, 20n, 25n],
            [10n, 15n, 20n, 25n, 30n],
            [15n, 20n, 25n, 30n, 35n],
            [20n, 25n, 30n, 35n, 40n],
            [25n, 30n, 35n, 40n, 45n],
            [30n, 35n, 40n, 45n, 50n],
            [35n, 40n, 45n, 50n, 55n],
            [40n, 45n, 50n, 55n, 60n],
            [45n, 50n, 55n, 60n, 65n],
        ];

    <span class="hljs-keyword">let</span> anyLine = <span class="hljs-literal">false</span>

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">87</span>; i++) {
      <span class="hljs-keyword">let</span> line = <span class="hljs-literal">true</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">5</span>; j++) {
        line = line &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>[<span class="hljs-title class_">Number</span>(lines[i][j])] == play
      }

      anyLine = anyLine || line
    }

    <span class="hljs-keyword">return</span> anyLine
  }

  <span class="hljs-meta">@method</span>()
  <span class="hljs-title function_">full</span>(): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">let</span> full = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-title class_">TicTacToe</span>.<span class="hljs-property">BOARDLEN</span>; i++) {
      full = full &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>[i] != <span class="hljs-title class_">TicTacToe</span>.<span class="hljs-property">EMPTY</span>
    }
    <span class="hljs-keyword">return</span> full
  }
}
</code></pre>
`

export default html
