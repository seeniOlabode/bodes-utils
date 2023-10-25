class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Stack {
  constructor(value, cap) {
    this.top = value ? new Node(value) : null;
    this.bottom = this.top;
    this.length = value ? 1 : 0;
    this.cap = cap;
  }

  push(value) {
    const newNode = new Node(value);
    if (this.bottom && this.top) {
      this.bottom.next = newNode;
      newNode.prev = this.bottom;
      this.bottom = newNode;
    } else {
      this.top = newNode;
      this.bottom = newNode;
    }
    if (this.checkCap()) {
      const deleted = this.top;
      this.top = this.top.next;
      this.top.prev = null;
      console.log(
        `Cap of ${this.cap} reached, this entry has been popped off the stack: `,
        this.deleted
      );
    } else {
      this.length++;
    }
    return this.bottom;
  }

  pop(value) {
    this.bottom = this.bottom.prev || this.bottom;
    this.length--;
    return this;
  }

  checkCap() {
    return this.cap && this.length >= this.cap;
  }

  bulkPush(array) {
    array.forEach((item) => {
      this.push(item);
    });
  }
}

class History {
  constructor(cap) {
    this.stack = new Stack(null, cap);
    this.head = null;
  }

  push(value) {
    this.head = this.stack.push(value);
    return this;
  }

  undo() {
    this.head = this.head.prev || this.head;
    return this.head.value;
  }

  redo() {
    this.head = this.head.next || this.head;
    return this.head.value;
  }

  bulkPush(array) {
    this.stack.bulkPush(array);
  }
}

class Browser {
  constructor(data, callback) {
    this.data = data || null;
    this.callback =
      callback ||
      function () {
        console.log("none");
      };
    this.history = new History(20);
    this.pushToHistory();
  }

  setData(key, value) {
    key && (this.data[key] = value);
    this.pushToHistory();
  }

  undo() {
    this.data = this.history.undo();
    this.callback(this.data);
  }

  redo() {
    this.data = this.history.redo();
    this.callback(this.data);
  }

  bulkSet(array) {
    array.forEach((item) => {
      this.data = item;
      this.pushToHistory();
    });
  }

  pushToHistory() {
    const dataUnwrapped = {
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      email: this.data.email,
      color: this.data.color,
    };
    this.history.push(dataUnwrapped);
  }
}
