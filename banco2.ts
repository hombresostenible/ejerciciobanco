
//a. Traer modulo express
import express from 'express';

//b. Instance of express
const app = express();

//Crear el arreglo ventas (sales). Este arreglo es la variable que va a analizar el banco para otorgar el credito o ofrecer asesoria. 
interface sales {
    customer: string;
    date: string;
    salesamount: number;
}


let salesDB: sales[] = [{
    customer: "Golosinas Lucho",
   date: "Enero",
salesamount: 750000,
},
{
    customer: "Autoteam",
   date: "Febrero",
salesamount: 250000,
},
{
   customer: "Bronces y mas",
   date: "Marzo",
salesamount: 1000000,
}
]




//Acciones del Programa para conocer ingresos de los negocios

app.get('/sales', function (request, response) {
    response.json(salesDB);
});

app.get('/sales/:customer', function (request, response) {
    const customer = request.params.customer;
    const result = salesDB.filter(item => item.customer === customer);
    response.json(result);
});

/*
    El método post utiliza el body del http porque la información que se va a guardar 
    viaja alli. Luego se opera con este. Para este ejemplo se hace push al arreglo 
    customers o su representación es que "se guarda información en la base de datos".
*/
app.post('/sales', function (request, response) {
    const body = request.body;
    salesDB.push(body);
    response.send('El cliente se ha guardado');
});

app.put('/sales/:costumer', function (request, response) {
    // El id y el body para la operación put son requeridas
    const customer = request.params.costumer;
    const body = request.body;
    const customerIndex = salesDB.findIndex(item => item.customer === customer);
    console.log("customerIndex", customerIndex);
    salesDB[customerIndex] = body;
    response.send('Cliente actualizado correctamente');
});

app.delete('/sales/:customer', function (request, response) {
    const customer = request.params.customer;
    const result = salesDB.filter(item => item.customer !== customer);
    salesDB = result;
    response.json("Cliente eliminado correctamente");
});

// Esta es la sintaxis para subir/activar el servidor
// app.listen( Puerto_Donde_Escucha, Callback_opcional );
// La funcionalidad del callback es ejecutar ese código la primera vez que se levanta el servidor

//Escuchar al servidor
app.listen(3000, () => {
    console.log("3000");
  })