// initialize app
var app = angular.module('myApp', ['ngMaterial', 'ngMessages']);

//service definition of 'postfix' which contains functions to convert normal expressions to postfix notation
app.service('postfix', function(){
  // ++++++++++++++++++++ HELPER FUNCTIONS

  //function definition for operator checking
  this.check_operator = function(e){
    if ((e == '+') || (e == '-') || (e == '*') || (e == '/')) return true;
    return false;

  } // end of check_operator function

  this.check_operand = function(e){
    if (e >= '0' && e <= '9') return true;
    return false;
  }

  this.check_priority = function(op){
    var priority = -1;

    switch(op[0]){
      case '+': priority = 1; break;
      case '-': priority = 1; break;
      case '*': priority = 2; break;
      case '/': priority = 2; break;
    }
    return priority;
  }

  this.compare_priority = function(op1, op2){
    var prOp1 = this.check_priority(op1);
    var prOp2 = this.check_priority(op2);

    if (prOp1 == prOp2 || prOp1 > prOp2) return true;
    return false;
  }

  this.compute = function(op1, op2, operation){
    switch(operation){
      case '*': return op2 * op1;
      case '/': return op2 / op1;
      case '+': return op2 + op1;
      case '-': return op2 - op1;
      default: return 0;
    }
  } // end of compute function

  this.tokenize = function(exp){
    var last_int = "";
    var tokens = new Array();

    for(i = 0; i < exp.length; i++){
      if (exp[i] == ' '){
        if (last_int != ""){
          tokens.push(last_int);
          last_int = "";
        }
      } else if (this.check_operator(exp[i])){
        if (last_int != ""){
          tokens.push(last_int);
          last_int = "";
        }

      tokens.push(exp[i]);

      } else if (exp[i] == '(' || exp[i] == ')'){
        if (last_int != ""){
          tokens.push(last_int);
          last_int = "";
        }
        tokens.push(exp[i]);
      }
      else {
        last_int = last_int.concat(exp[i]);
      }
    }
    if (last_int != ""){
      tokens.push(last_int);
    }
    return tokens;
  }// end of tokenize function

  // ++++++++++++++++++++++++ END OF HELPER FUNCTIONS

  // function definition to calculate a postfix expression. Uses: Tokenize, check_operator, compute
  this.calc = function(pexp){
    var result = 0;
    var stack = new Array();
    var tokens = this.tokenize(pexp);
    var op1, op2;
    for (i in tokens){
      if (!this.check_operator(tokens[i])){
        stack.push(parseFloat(tokens[i]));
      } else {
        op1 = stack[stack.length-1];
        stack.pop();
        op2 = stack[stack.length-1];
        stack.pop();
        result = this.compute(op1, op2, tokens[i]);
        stack.push(result);
        console.log(result);
      }
    }
    return result;
  }

  // function definition to convert normal expression to postfix expression. Uses: Tokenize, check_operator, check_operand, and compare_priority.
  this.getPostFix = function(nexp){
    var stack = new Array();
    var tokens = this.tokenize(nexp);

    var pexp = "";

    for(i = 0; i<tokens.length; i++){

      if (this.check_operator(tokens[i][0])){
        while (stack.length>0 && stack[stack.length-1] != '(' && this.compare_priority(stack[stack.length-1], tokens[i])){
          pexp = pexp + stack[stack.length-1] + " ";
          stack.pop();
        }
        stack.push(tokens[i]);
      }
      else if (this.check_operand(tokens[i][0])){
        pexp = pexp + tokens[i] + " ";
      }
      else if (tokens[i] == '('){
        stack.push(tokens[i]);
      }
      else if (tokens[i] == ')'){
        while(stack.length>0 && stack[stack.length-1] != '('){
          pexp = pexp + stack[stack.length-1] + " ";
          stack.pop();
        }
        stack.pop();
      }// end nested if
    } // end for loop

    while(stack.length>0){
      pexp = pexp + stack[stack.length-1] + " ";
      stack.pop();
    }

    return pexp;
  } // end of getpostfix function
});//end of postfix service

//controller definition for 'myCtrl'
app.controller('myCtrl', function($scope, postfix){
  $scope.exp = "";
  $scope.calc = function(x){
    var nexp = postfix.tokenize(x);
    $scope.nexpression = "";

    for (i in nexp){
      $scope.nexpression += nexp[i] + " ";
    }
    $scope.exp = postfix.calc($scope.pexpression);
  }

  $scope.exppend = function(x){
    $scope.exp += x;
    $scope.pexpression = postfix.getPostFix($scope.exp);
  }

  $scope.del = function(){
    $scope.exp = $scope.exp.slice(0, -1);
    $scope.pexpression = postfix.getPostFix($scope.exp);
  }

  $scope.clear = function(){
    $scope.exp = "";
    $scope.nexpression = "";
    $scope.pexpression = "";
  }

  $scope.update = function(){
    $scope.pexpression = postfix.getPostFix($scope.exp); 
  }


});
