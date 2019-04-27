const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function () {
    // Current Index of Words
    const current = this.wordIndex % this.words.length;
    
    //Get Full Text of Current Words
    const fullTxt = this.words[current];

    //Check if Deleting
    if(this.isDeleting) {
        //Remove Char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }
    else {
        //Add Char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
        //Insert txt into Element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        // Type Speed
        let typespeed = 300;
        if(this.isDeleting) {
            typespeed /= 2;
        }

        //if word is complete
        if(!this.isDeleting && this.txt === fullTxt){
            // Make Pause at the End
            typespeed = this.wait;
            // Set delete to True
            this.isDeleting = true;

        }else if (this.isDeleting && this.txt ==='') {
            this.isDeleting = false;
            // Move to the next word
            this.wordIndex++;
            // Pause before start typing
            typespeed = 500;
        }
    setTimeout(() => this.type(), 500)
    


}

// Init On Dom Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init () {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
//Init TypeWriter
    new TypeWriter(txtElement, words, wait);    
}