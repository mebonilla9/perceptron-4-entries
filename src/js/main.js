import '../css/style.css'

document.querySelector('#app').innerHTML = `
  <h1 class="text-center">Perceptron de cuatro entradas</h1>
  <br>
  <div class="container">
    <div class="container-input">

      <div class="col">
        <h5 class="text-center">VALORES INICIALES</h5>
        <div class="form-floating">
          <input type="text" class="form-control" id="W1" placeholder="1.2">
          <label for="floatingInput">Peso W1</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="W2" placeholder="1.2">
          <label for="floatingInput">Peso W2</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="W3" placeholder="1.2">
          <label for="floatingInput">Peso W3</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="W4" placeholder="1.2">
          <label for="floatingInput">Peso W4</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="E" placeholder="1.2">
          <label for="floatingInput">Factor de aprendizaje</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="ERROR" placeholder="1.2">
          <label for="floatingInput">Error</label>
        </div>
        <br>
        <div class="d-grid gap-2">
          <button id="btnCalc" class="btn btn-primary" type="button" aria-disabled="true">CALCULAR</button>
        </div>

      </div>
    </div>
    <div class="container-table">
      <div class="col-12">

        <h4 class="text-center">Nuevos valores</h4>

        <div class="collapse" id="labels">
          <div class="row">
            <div class="col-2">
              <div class="card">
                <div class="card-body text-center">
                  <h5 class="card-title">Nuevo peso W1</h5>
                  <p class="card-text" id="nW1"></p>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="card">
                <div class="card-body text-center">
                  <h5 class="card-title">Nuevo peso W2</h5>
                  <p class="card-text" id="nW2"></p>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="card">
                <div class="card-body text-center">
                  <h5 class="card-title">Nuevo peso W3</h5>
                  <p class="card-text" id="nW3"></p>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="card">
                <div class="card-body text-center">
                  <h5 class="card-title">Nuevo peso W4</h5>
                  <p class="card-text" id="nW4"></p>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="card">
                <div class="card-body text-center">
                  <h5 class="card-title">Nuevo Error</h5>
                  <p class="card-text" id="nError"></p>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="card">
                <div class="card-body text-center">
                  <h5 class="card-title">Iteraciones</h5>
                  <p class="card-text" id="nCounter"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div>
          <h4 class="text-center">Evaluación de las salidas según las entradas</h4>

          <table class="table table-striped table-hover" id="resultTable">
            <thead>
              <tr>
                <th scope="col" class="text-center">Yi</th>
                <th scope="col" class="text-center">X1</th>
                <th scope="col" class="text-center">W1</th>
                <th scope="col" class="text-center">X2</th>
                <th scope="col" class="text-center">W2</th>
                <th scope="col" class="text-center">X3</th>
                <th scope="col" class="text-center">W3</th>
                <th scope="col" class="text-center">X4</th>
                <th scope="col" class="text-center">W4</th>
                <th scope="col" class="text-center">ERROR</th>
                <th scope="col" class="text-center">SALIDA</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
        <br>
        <div class="collapse" id="testResponse">
          <h4 class="text-center">Probar nuevos valores</h4>

          <div class="row justify-content-center">
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control" id="valueV1" placeholder="1.2">
                <label for="floatingInput">Valor 1</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control" id="valueV2" placeholder="1.2">
                <label for="floatingInput">Valor 2</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control" id="valueV3" placeholder="1.2">
                <label for="floatingInput">Valor 3</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating">
                <input type="text" class="form-control" id="valueV4" placeholder="1.2">
                <label for="floatingInput">Valor 4</label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-control">
                <input type="text" class="form-control" id="response" value="" readonly>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
`
let weight = new Array
let E
let ERROR
let desiredOutput = [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1]
const trueTable = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1] //->> X1
  , [-1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1] //->> X2
  , [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1] //->> X3
  , [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1] //->> X4
]
let response = []
let counter
let umbral = -1
let perceptron
let estado
let table = document.getElementById("resultTable")
const selectValue1 = document.getElementById("valueV1")
const selectValue2 = document.getElementById("valueV2")
const selectValue3 = document.getElementById("valueV3")
const selectValue4 = document.getElementById("valueV4")

function operation(index) {
  let sumproduct = (weight[0] * trueTable[0][index])
    + (weight[1] * trueTable[1][index])
    + (weight[2] * trueTable[2][index])
    + (weight[3] * trueTable[3][index])
  let y = Math.tanh(sumproduct) - ERROR
  if (y >= 0) {
    y = 1
  } else {
    y = -1
  }
  return y
}

function operationTest(val1, val2, val3, val4) {
  let sumproduct = (weight[0] * val1)
    + (weight[1] * val2)
    + (weight[2] * val3)
    + (weight[3] * val4)
  let y = Math.tanh(sumproduct) - ERROR
  console.log('pesos: ', weight)
  console.log('Error: ', ERROR)
  console.log('suma producto', sumproduct)
  console.log('Y', y)

  if (y >= 0) {
    y = 1
  } else {
    y = -1
  }

  return y
}

function validateValue(index, value) {

  let error = (desiredOutput[index] - value)
  if (error == 0) {
    return true
  } else {
    return false
  }
}

function weightRecalculate(index) {

  let Y = desiredOutput[index]
  let X1 = trueTable[0][index]
  let X2 = trueTable[1][index]
  let X3 = trueTable[2][index]
  let X4 = trueTable[3][index]
  weight[0] = weight[0] + (2 * E * Y * X1)
  weight[1] = weight[1] + (2 * E * Y * X2)
  weight[2] = weight[2] + (2 * E * Y * X3)
  weight[3] = weight[3] + (2 * E * Y * X4)
  ERROR = (ERROR + (2 * E * Y * umbral))

}

function viewResponse() {
  console.log("Response: ", response)
}

function viewWeight() {
  console.log("Weight: ", weight)
}

function useNeuralCase() {
  if (counter >= 1000) {
    perceptron = false
    return
  }
  counter++
  estado = true
  for (let i = 0; i < 16; i++) {
    let y = operation(i)
    if (validateValue(i, y) == false) {
      weightRecalculate(i)
      estado = false
      response = []
      break
    }
    response.push(y)

  }
  if (estado == false) {
    useNeuralCase()
  }

  return
}

function addRowResponse() {
  for (let i = 0; i < 16; i++) {
    let operation = (Math.tanh(((weight[0] * trueTable[0][i]) + (weight[1] * trueTable[1][i]) + (weight[2] * trueTable[2][i]) + (weight[3] * trueTable[3][i]))) - ERROR)
    let salida = ((operation >= 0)) ? 1 : 0
    table.insertRow(-1).innerHTML =
      '<tr><th scope="row" class="text-center">' + (i + 1) + '</th><td class="text-center">' + trueTable[0][i] + '</td><td class="text-center">' + weight[0] + '</td><td class="text-center">' + trueTable[1][i] + '</td><td class="text-center"> ' + weight[1] + '</td><td class="text-center">' + trueTable[2][i] + '</td><td class="text-center">' + weight[2] + '</td><td class="text-center">' + trueTable[3][i] + '</td><td class="text-center">' + weight[3] + '</td><td class="text-center">' + ERROR + '</td><td class="text-center">' + salida + '</td></tr>'
  }
}

function addRowError() {
  table.insertRow(-1).innerHTML =
    '<tr><th class="text-center" colspan="11">NO SE ENCONTRÓ VALORES</th></tr>'
}

function initializeValues() {
  counter = 0
  weight = []
  perceptron = true
  weight.push(parseFloat(document.getElementById("W1").value))
  weight.push(parseFloat(document.getElementById("W2").value))
  weight.push(parseFloat(document.getElementById("W3").value))
  weight.push(parseFloat(document.getElementById("W4").value))
  E = parseFloat(document.getElementById("E").value)
  ERROR = parseFloat(document.getElementById("ERROR").value)
  clearLabelTestResponse()
}

function start() {
  initializeValues()
  useNeuralCase()
  if (table.rows.length > 0) {
    dropRowTable()
  }
  if (!perceptron) {
    addRowError()
    hiddenLabels()
    return
  }
  addLabels()
  addRowResponse()
  addTestResponse()
  return
}

function dropRowTable() {
  var rowCount = table.rows.length
  for (let i = (rowCount - 1); i > 0; i--) {
    table.deleteRow(i)
  }
}

function addLabels() {
  var myCollapse = document.getElementById('labels')
  myCollapse.className = " .collapsing"
  myCollapse.style.display = 'block'
  myCollapse.setAttribute("data-bs-toggle", "collapse")
  document.getElementById("nW1").innerHTML = weight[0]
  document.getElementById("nW2").innerHTML = weight[1]
  document.getElementById("nW3").innerHTML = weight[2]
  document.getElementById("nW4").innerHTML = weight[3]
  document.getElementById("nError").innerHTML = ERROR
  document.getElementById("nCounter").innerHTML = counter
}

function addTestResponse() {
  var myCollapse = document.getElementById('testResponse')
  myCollapse.className = " .collapsing"
  myCollapse.style.display = 'block'
  myCollapse.setAttribute("data-bs-toggle", "collapse")
}

function hiddenLabels() {
  var myCollapse = document.getElementById('labels')
  myCollapse.style.display = 'none'
}



function testNewValue() {
  let v1 = parseFloat(selectValue1.value)
  let v2 = parseFloat(selectValue2.value)
  let v3 = parseFloat(selectValue3.value)
  let v4 = parseFloat(selectValue4.value)
  let response = operationTest(v1, v2, v3, v4)
  console.log("response: ", response)

  document.getElementById("response").value = response
}

selectValue1.addEventListener('change', (event) => {
  if (selectValue1.value != '' && selectValue2.value != '' && selectValue3.value != '' && selectValue4.value != '') {
    testNewValue()
  } else {
    document.getElementById("response").value = ''
  }
})

selectValue2.addEventListener("change", (event) => {
  if (selectValue1.value != '' && selectValue2.value != '' && selectValue3.value != '' && selectValue4.value != '') {
    testNewValue()
  } else {
    document.getElementById("response").value = ''
  }
})

selectValue3.addEventListener('change', (event) => {
  if (selectValue1.value != '' && selectValue2.value != '' && selectValue3.value != '' && selectValue4.value != '') {
    testNewValue()
  } else {
    document.getElementById("response").value = ''
  }
})

selectValue4.addEventListener("change", (event) => {
  if (selectValue1.value != '' && selectValue2.value != '' && selectValue3.value != '' && selectValue4.value != '') {
    testNewValue()
  } else {
    document.getElementById("response").value = ''
  }
})


function clearLabelTestResponse() {
  selectValue1.value = ''
  selectValue2.value = ''
  selectValue3.value = ''
  selectValue4.value = ''
}

const btnCalc = document.getElementById("btnCalc")
btnCalc.addEventListener("click", start)
