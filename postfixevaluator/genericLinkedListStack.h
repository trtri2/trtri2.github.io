#include <iostream>
#include <stddef.h>

using namespace std;

template <typename E>
class genericLinkedListStack;

template <typename E>
class SNode {
private:
	E elem;
	SNode* next;
	friend class genericLinkedListStack<E>;
};

template <typename E>
class genericLinkedListStack {
public:
	genericLinkedListStack() : head(NULL) { }

	bool empty() const { return head == NULL; }

	const E& top() const { return head->elem; }

	~genericLinkedListStack() { while (!empty()) pop(); }

	void push(const E& e) {                  // add to front of list
		SNode<E>* v = new SNode<E>;          // create new node
		v->elem = e;                         // store data
		v->next = head;                      // head now follows v
		head = v;                            // v is now the head
	}

	void pop() {             	     // remove front item
		SNode<E>* old = head;                // save current head
		head = old->next;                    // skip over old head
		delete old;                          // delete the old head
	}

	void print() {
		SNode<E>* v = head;
		while (v != NULL) {
			cout << v->elem << " ";
			v = v->next;
		}
		cout << endl;
	}

	genericLinkedListStack(const genericLinkedListStack & l) {
		if (l.head == NULL)
			head = NULL;
		else {
			head = new SNode<E>;
			//head->elem = l.head->elem;
			SNode<E>* myCursor = head, *theirCursor = l.head;

			if (l.empty())
				cout << "the other list is empty!" << endl;


			while (theirCursor != NULL) {
				cout << "copying " << theirCursor->elem << endl;
				myCursor->elem = theirCursor->elem;
				if (theirCursor->next != NULL) {
					myCursor->next = new SNode<E>;
					myCursor = myCursor->next;
				}
				else
					myCursor->next = NULL;

				//cout << "head->elem is " << head->elem << endl;
				//cout << "myCursor->elem is " << myCursor->elem << endl;

				theirCursor = theirCursor->next;
			}

		}
	}

private:
	SNode<E>* head;
};


