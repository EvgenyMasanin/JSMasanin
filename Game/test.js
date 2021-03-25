
if({name:'bob'}){
    console.log('bob');
}


if (ball.x + ball.width > this.x && ball.x < this.x + this.width &&
    ball.y + ball.height <= this.y + this.margin) {
    ball.dy *= -1;
    ball.y = this.y - ball.height - 2;
}
else if (ball.x + ball.width > this.x && ball.x < this.x + this.width &&
    ball.y >= this.y + this.height - this.margin) {
    ball.dy *= -1;
    ball.y = this.y + this.height + ball.height + 2;
}
else if (ball.x <= this.x + this.width / 2 &&
    ball.y + ball.height >= this.y &&
    ball.y <= this.y + this.height) {
    ball.dx *= -1;
    ball.x = this.x - ball.width - 2
}
else if (ball.x > this.x + this.width / 2 &&
    ball.y + ball.height >= this.y &&
    ball.y <= this.y + this.height) {
    ball.dx *= -1;
    ball.x = this.x + this.width + ball.width + 2
}



//-------------------------

if (ball.x + ball.width + ball.speed > this.x && ball.x < this.x + this.width + ball.speed) {
    ball.dy *= -1;
    if (ball.y + ball.height <= this.y + this.margin) {
        this.color = 'red';
        alert(`Up
                        {this.x  -  }${this.x}
                        {this.y  -  }${this.y}
                        {this.width  -  }${this.width}
                        {this.height  -  }${this.height}
                        {ball.x  -  }${ball.x}
                        {ball.y  -  }${ball.y}
                        {ball.width  -  }${ball.width}
                        {ball.height  -  }${ball.height}
                        `)

        ball.y = this.y - ball.height - 2;
    }
    else if (ball.y >= this.y + this.height - this.margin) {
        this.color = 'red';
        alert(`Down
                        {this.x  -  }${this.x}
                        {this.y  -  }${this.y}
                        {this.width  -  }${this.width}
                        {this.height  -  }${this.height}
                        {ball.x  -  }${ball.x}
                        {ball.y  -  }${ball.y}
                        {ball.width  -  }${ball.width}
                        {ball.height  -  }${ball.height}
                        `)

        ball.y = this.y + this.height + ball.height + 2;
    }
}
else if (ball.y + ball.height >= this.y && ball.y <= this.y + this.height) {
    ball.dx *= -1;
    if (ball.x <= this.x + this.width / 2) {
        this.color = 'red'
        alert(`right
                        {this.x  -  }${this.x}
                        {this.y  -  }${this.y}
                        {this.width  -  }${this.width}
                        {this.height  -  }${this.height}
                        {ball.x  -  }${ball.x}
                        {ball.y  -  }${ball.y}
                        {ball.width  -  }${ball.width}
                        {ball.height  -  }${ball.height}
                        `)

        ball.x = this.x - ball.width - 2
    }
    else if (ball.x > this.x + this.width / 2) {
        this.color = 'red'
        alert(`left
                        {this.x  -  }${this.x}
                        {this.y  -  }${this.y}
                        {this.width  -  }${this.width}
                        {this.height  -  }${this.height}
                        {ball.x  -  }${ball.x}
                        {ball.y  -  }${ball.y}
                        {ball.width  -  }${ball.width}
                        {ball.height  -  }${ball.height}
                        `)

        ball.x = this.x + this.width + ball.width + 2
    }
}
else {
    this.color = 'red'
    alert(`Err
                        {this.x  -  }${this.x}
                        {this.y  -  }${this.y}
                        {this.width  -  }${this.width}
                        {this.height  -  }${this.height}
                        {ball.x  -  }${ball.x}
                        {ball.y  -  }${ball.y}
                        {ball.width  -  }${ball.width}
                        {ball.height  -  }${ball.height}
                        `)

}
