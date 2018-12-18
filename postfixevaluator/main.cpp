// TRUNG (LEON) TRIEU
// ASSIGNMENT 2 - CMPT 225 (GOLNAR S.)
// * USED GENERICLINKEDLIST STACK IMPLEMENTATION

#include<iostream>
#include "postfixUtility.h"
#include "genericLinkedListStack.h"

using namespace std;
int main(int argc, char** argv) {
	string nexp = argv[1];
	string pexp = "";
	postfixUtility abc;
	pexp = abc.getPostfix(nexp);
	float result = abc.evaluatePostfix(pexp);
	cout << result << endl;





}