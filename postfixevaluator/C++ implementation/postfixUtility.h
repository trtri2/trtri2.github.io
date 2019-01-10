#ifndef POSTFIXUTILITY_H
#define POSTFIXUTILITY_H

#include<iostream>
#include<stack>
#include<vector>
#include<fstream>
#include<string>

using namespace std;

class postfixUtility {
public:
	postfixUtility() {}


	float compute(float a, float b, char o);
	bool check_operand(char e);
	bool check_operator(char e);
	int check_priority(string a1);
	int higherPrecedence(string b1, string b2);
	void Tokenize(string n, vector<string>& tokens);
	string getPostfix(string nexp);
	float evaluatePostfix(string pexp);

};
#endif
