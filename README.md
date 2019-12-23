# dockerizar a aplicacao
# escrever uma pequena documentacao do que é necessário
# escrever testes unitários e de integracao
# criar um shell script para iniciar a aplicacao
# passar a descricao dos testes pra ingles

# Run application
```
$ cd nuchallenge
$ npm start <directory of file>
```

# Run tests
```
$ cd nuchallenge
$ npm test
```

# Debug tests in Chrome

Try using the debugging support built into Node. Note: This will only work in **Node.js 8+**.
Place a **debugger;** statement in any of your tests, and then, in your project's directory, run:

```
$ cd nuchallenge
$ npm run test:debugger
```

To debug in Google Chrome (or any Chromium-based browser), open your browser and go to **chrome://inspect** and click on "Open Dedicated DevTools for Node", which will give you a list of available node instances you can connect to. Click on the address displayed in the terminal (usually something like localhost:9229) after running the above command, and you will be able to debug Jest using Chrome's DevTools.