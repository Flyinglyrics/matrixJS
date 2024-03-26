# matrixJS

## Introduction
introduciton in HTML **script** Element:  
    `<script src='/Matrix.js' type='module'>`  
introduciton in ES module:  
    `import Matrix from '/Matrix.js'`  
## Usage
* create  
use `Matrix.getIdentityMartix(int i)` to get identity matrix.  
or use custome array as matrix data:
```
let arr = [1,2,3,4,5,6,7,8,9];
let mat33 = new Matrix(3,3,arr);
```
* manipulate  
use `Matrix.prototype.get(int i,int j)` to get the value of the element in row i and column j  
use `Matrix.prototype.set(int i,int j,number value)` to set specific value   
use `Matrix.prototype.transpose()` to get transpose of origin matrix  
use `Matrix.prototype.swapRows(int i,int j)` to swap two rows of the origin matrix  
use `Matrix.prototype.addRows(int i,int j,number k)` to multiply row i with number k and then add to row j;  
use `Matrix.prototype.inverse()` to get the inverse of the origin matrix;  
## More using details
see [Manual](https://github.com/Flyinglyrics/matrixJS/blob/main/Manual.md)