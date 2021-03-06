const express = require('express');

// utilizar biblioteca express para recursos de aplicativos web
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// importar API criada por colegas
const Yamaform = require('yamaform');
const dbConfig = require('./config');
const BaseView = require('./base-view.js');
const ClienteController = require('./controller/cliente-controller.js');
const LocacaoController = require('./controller/locacao-controller.js');
const VeiculoController = require('./controller/veiculo-controller.js');

const yamaform = new Yamaform(dbConfig, `${__dirname}/database.json`);


generateTables = async () => {
    await yamaform.generateTables()
  }

// generateTables();

// HOME
app.get('/', async(req, res) => {
  res.set('Content-Type', 'text/html');                
  res.send(new Buffer(
    BaseView.render('<h1>Welcome to T2-Construção</h1>')
    ));
}) 

// inicializar atributos que acessam classes View e Controller
const clienteView = new BaseView(app, yamaform, 'cliente')
const locacaoView = new BaseView(app, yamaform, 'locacao');
const veiculoView = new BaseView(app, yamaform, 'veiculo');
const clienteController = new ClienteController(app, yamaform);
const locacaoController = new LocacaoController(app, yamaform);
const veiculoController = new VeiculoController(app, yamaform);

clienteView.getTable();
clienteView.getForm();
clienteView.getEditForm();

locacaoView.getTable();
locacaoView.getForm();
locacaoView.getEditForm();

veiculoView.getTable();
veiculoView.getForm();
veiculoView.getEditForm();

clienteController.createCliente();
clienteController.updateCliente();
clienteController.deleteCliente();

locacaoController.createLocacao();
locacaoController.updateLocacao();
locacaoController.deleteLocacao();

veiculoController.createVeiculo();
veiculoController.updateVeiculo();
veiculoController.deleteVeiculo();


module.exports = app;
