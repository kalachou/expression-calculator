function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    function calculateSummands(arr) {
        let result = arr;
        let summand;
        let summandIndex = result.findIndex(x => x === "+" || x === "-");
        while (summandIndex !== -1) {
            result[summandIndex] === "+"
                ? summand = result[summandIndex - 1] + result[summandIndex + 1]
                : summand = result[summandIndex - 1] - result[summandIndex + 1]
            result.splice(summandIndex - 1, 3, summand);
            summandIndex = result.findIndex(x => x === "+" || x === "-");
        }
        return result[0];
    }
    //function parseBrackets() { }
    function calculateFactors(arr) {
        let result = arr;
        let factor;
        let factorIndex = result.findIndex(x => x === "*" || x === "/");
        while (factorIndex !== -1) {
            result[factorIndex] === "*"
                ? factor = result[factorIndex - 1] * result[factorIndex + 1]
                : factor = result[factorIndex - 1] / result[factorIndex + 1]
            result.splice(factorIndex - 1, 3, factor);
            factorIndex = result.findIndex(x => x === "*" || x === "/");
        }
        return result;
    }

    function calculateParenthis(arr) {
        let result = arr;
        let array;
        let arrayIndex = result.findIndex(x => x instanceof Array);
        while (arrayIndex !== -1) {
            result[arrayIndex] = calculateParenthis(result[arrayIndex]);
            arrayIndex = result.findIndex(x => x instanceof Array);
        }
        result = calculateFactors(result);
        result = calculateSummands(result);
        if (result < 0) {
            //result = `(${result})`;
        }
        return result;
    }

    if (expr.indexOf("/ 0") !== -1) {
        throw "TypeError: Division by zero.";
    }

    expr = expr.replace(/\(/g, '[').replace(/\)/g, ']').replace(/ /g, '');
    let arrString = expr.match(/\[+\d+|\d+\]+|\d+|\+|\-|\*|\//g)
        .join(",")
        .replace(/\-/g, '"-"')
        .replace(/\+/g, '"+"')
        .replace(/\//g, '"/"')
        .replace(/\*/g, '"*"')

    try {
        array = JSON.parse(`[${arrString}]`);
    } catch {
        throw 'ExpressionError: Brackets must be paired';
    }

    return calculateParenthis(array);

}

module.exports = {
    expressionCalculator
}