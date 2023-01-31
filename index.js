/*

to run the code just enter node index.js <argument>

*/

const expression = process.argv.slice(2);
/*

exit code with exitcode 1 (fatal exception)
if the expression is empty

*/
if (!expression.length) {
    console.log("Give me something to do!");
    process.exit(1);
}

/* 

all calculator options added in place, adding 
any other options like subtract or exponent or 
divide can be made by addition of one line

*/
const calculatorOptions = {
    add: (arg1, arg2) => arg1 + arg2,
    multiply: (arg1, arg2) => arg1 * arg2
}

/*

function that solves the expression that is passed to it,
it removes the open and closing brackets, splits the string,
identifying, the type of the function (add/multiply or any other)
and the digits for said function and then calls the appropriate 
function from the calculatoroptions object

*/
const solveCurrentExpresion = (toSolveSubstr) => {

    toSolveSubstr = (toSolveSubstr.replace(/[()]/, '')).split(' ');
    return calculatorOptions[toSolveSubstr[0]](parseInt(toSolveSubstr[1]), parseInt(toSolveSubstr[2]));
}

/*

using a do while to keep solving the nested function
until there are no more nested expressions to solve
by using a simple boolean flag and identifying the position
of the opening and its closing bracket

*/
let nested = true;
do {
    const innermostOpenBracket = expression[0].lastIndexOf('(')
    const innermostBracketClosed = expression[0].indexOf(')', innermostOpenBracket)
    const currentExpr = expression[0].substring(innermostOpenBracket, innermostBracketClosed + 1);
    /*
    IF: if the entered argument is a simple integer and not an expression
    simply print the passed digit and make the flag to continue, false

    ELSE IF: if the innermostOpenBracket index is 0, which means the last open bracket is at the 
    first position, which means there are no more nested operations to be completed

    ELSE: if the inner most open bracket is not at the first index, the code will continue to
    find and solve the innermost expression first; solves the current innermost expression
    and replaces the entire expression with the result
    */
    if (innermostOpenBracket == -1) {
        console.log(parseInt(expression[0]))
        nested = false;
    }
    else if (!innermostOpenBracket) {
        var solvedAnswer = solveCurrentExpresion(currentExpr);
        console.log(solvedAnswer)
        nested = false;
    }
    else {
        expression[0] = expression[0].replace(currentExpr, solveCurrentExpresion(currentExpr));
    }


} while (nested)

