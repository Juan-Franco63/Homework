class Node {
  constructor(song, next = null) {
    this.song = song;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node("Song 1",
      new Node("Song 2",
        new Node("Song 3",
          new Node("Song 4", null)
        )
      )
    );
    this.current = this.head;
  }

  nextSong() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
  }

  reset() {
    this.current = this.head;
  }

  getCurrentSong() {
    return this.current ? this.current.song : "No more songs";
  }
}

export default LinkedList;
