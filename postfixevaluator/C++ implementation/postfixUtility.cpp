#include<iostream>
#include<stack>
#include<vector>
#include "postfixUtility.h"
#include "genericLinkedListStack.h"
#include<fstream>
#include<string>


using namespace std;

bool postfixUtility::check_operator(char e) {	// checks if character is one of the four operators
	return ((e == '+') || (e == '-') || (e == '*') || (e == '/'));
}

bool postfixUtility::check_operand(char x) {	// checks if the character is a legitmate digit
	if (x >= '0' && x <= '9') return true;
	return false;
}

int postfixUtility::check_priority(string op) {		//returns the weight of the operator for comparison
	int priority = -1;

	switch (op[0]) {
	case '+': priority = 1; break;
	case '-': priority = 1; break;
	case '*': priority = 2; break;
	case '/': priority = 2; break;
	}
	return priority;

}

int postfixUtility::higherPrecedence(string op1, string op2) {		//checks operator that has higher precedence
	int prOp1 = 0;
	int prOp2 = 0;

	prOp1 = check_priority(op1);
	prOp2 = check_priority(op2);

	if (prOp1 == prOp2) {
		return true;
	}

	return prOp1 > prOp2 ? true : false;
}

float postfixUtility::compute(float op1, float op2, char operation) {
	switch (operation) {
	case '*': return op2 * op1;
	case '/': return op2 / op1;
	case '+': return op2 + op1;
	case '-': return op2 - op1;
	default: return 0;
	}
}

void postfixUtility::Tokenize(string expression, vector<string>& tokens) {//tokenizes expression into vector
	string last_int = "";
	for (int i = 0; i < expression.length(); i++) {

		if (expression[i] == ' ') {
			if (last_int != "") {
				tokens.push_back(last_int);
				last_int = "";

			}
		} else 	if (check_operator(expression[i])) {
			if (last_int != "") {
				tokens.push_back(last_int);
				last_int = "";
			}

			string one_char = " ";
			one_char[0] = expression[i];
			tokens.push_back(one_char);
		}
		else if (expression[i] == '(' || expression[i] == ')') {
			if (last_int != "") {
				tokens.push_back(last_int);
				last_int = "";
			}
			string bracket = " ";
			bracket[0] = expression[i];
			tokens.push_back(bracket);
		}
		else {
			last_int.push_back(expression[i]);		// if its not a bracket, operator, or space, then it is a digit
		}
	}
	if (last_int != "")
		 tokens.push_back(last_int);			//add the leftover character in the string

}

string postfixUtility::getPostfix(string nexp) {
//	stack<string> opS;			// STL CONTAINER OF STACK
	genericLinkedListStack<string> opS;		//LINKED LIST BASED STACK IMPLEMENTATION
	vector<string> vtokens;
	string pexp = "";
	Tokenize(nexp, vtokens);

	for (int i = 0; i < vtokens.size(); i++ ) {

		if (vtokens[i] == " " || vtokens[i] == "\"") {
			continue;
		}
		else if (check_operator(vtokens[i][0])) {
			while (!opS.empty() && opS.top() != "(" && higherPrecedence(opS.top(), vtokens[i])) {
				pexp = pexp + opS.top() + " ";
				opS.pop();
			}
			opS.push(vtokens[i]);

		}
		else if (check_operand(vtokens[i][0])) {
			pexp = pexp + vtokens[i] + " ";
		}
		else if (vtokens[i] == "(") {
			opS.push(vtokens[i]);
		}
		else if (vtokens[i] == ")") {
			while (!opS.empty() && opS.top() != "(") {
				pexp = pexp + opS.top() + " ";
				opS.pop();
			}
			opS.pop();
		}
	}
	while (!opS.empty()) {
		pexp = pexp + opS.top() + " ";
		opS.pop();
	}

	return pexp;
}

float postfixUtility::evaluatePostfix(string pexp) {
	float val = 0;
	vector<string> tokens;
//	stack<float> s;				// STL CONTAINER OF STACK
	genericLinkedListStack<float> s;		// generic implementation of linked list based stack
    Tokenize(pexp, tokens);

	for (int i = 0; i < tokens.size(); i++) {
		if (!check_operator(tokens[i][0])) {
			s.push(stof(tokens[i]));
		}
		else {
			float op1 = s.top();
			s.pop();
			float op2 = s.top();
			s.pop();
			val = compute(op1, op2, tokens[i][0]);
			s.push(val);
		}
	}
	return val;
}
