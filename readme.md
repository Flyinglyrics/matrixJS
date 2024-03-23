# matrixJS
Matrix for javascript
## Install
just copy the 'Matrix.js' file into where you like.
## Usage
### introduction
introduciton in HTML script Element:  
    `<script src='./lib/Matrix.js' type='module'>`  
introduciton in ES module:  
    `import Matrix from './lib/Matrix.js'`  
### create
examples:  
* create without any argument provided, will default create 4-rank identity matrix:  
`new Matrix();`  
* create 4 rank square matrix, and transfer [...] as initial data:  
`new Matrix(4,[...])`
>note that row comes first when you specify the rows and columns. But when transfer matrix data, it should be offered column by column.
* create Matrix with 3 rows and 4 columns, and transfer [...] as initial data:  
`new Matrix(3,4,[...])`  
or:  
`new Matrix([3,4],[...])`
* create Matrix with 3 rows and 4 columns without data transfered:  
`new Matrix([3,4])`
>you can create matrix with or without initial data transfered. When no data was specified, all element will be set to 0. If the initial data offered does not match the length, the odd will be reduced, the unsufficient will be completion complemented by 0.  
* use `Matrix.getIdentityMatrix(rank)` static function to get identity matrix with specific rank:  
create 5-rank identity Matrix：    
`let iMat5 = Matrix.getIdentityMatrix(5)`
### modify
`Matrix.prototype.setColumn()` and `Matrix.prototype.setRow()` are provided to modify the matrix by hand.  

examples:  
>* create a 4-rank Zero matrix, and use `setColumn(int column,[...])` to modify it into an indentity matrix  
>```
>console.log(mat44.stringify()); 
>const mat44 = new Matrix(4);
>mat44.setColumn(1,[1,0,0,0]);  
>mat44.setColumn(2,[0,1,0,0]);
>mat44.setColumn(3,[0,0,1,0]);
>mat44.setColumn(4,[0,0,0,1]);
>console.log(mat44.stringify());
>```
>* Create a Zero matrix with 4 rows and 5 columns, and use `setRow(int row,[...])` to modify each row  
>```
>const mat45 = new Matrix(4,5);
>console.log(mat45.stringify());
>mat45.setRow(1,[1,0,0,0,0]);
>mat45.setRow(2,[0,1,0,0,0]);
>mat45.setRow(3,[0,0,1,0,0]);
>mat45.setRow(4,[0,0,0,1,0]);
>```
### compute
#### add
`Matrix.prototype.add(Matrix mat)`method will modify the origin matrix. As the parameter, matrix should be the 'homogeneous matrix', and this methods do nothing to its paramter.  
>What the 'homogeneous' means is the two matrix compared have same row counts and column counts.  

examples:
>```
>const mat44 = new Matrix(4,4);
>const mat44_2 = new Matrix(4,4);
>mat44.add(mat44_2);
>```
#### minus  
`Matrix.prototype.minus(Matrix mat);` 
#### scalar mutiply
`Matrix.prototype.scalarMultiply(double k)`This methods will modify the origin matrix：  
```
const imat55 = Matrix.getIdentityMatrix(5);
console.log(imat55.stringify());
imat55.scalarMultiply(3);
console.log(imat55.stringify());
```  
#### divide
`Matrix.prototype.scalarDivide(double k);`  
#### multiply
`Matrix.prototype.multiply(Matrix mat);`  
examples: 
``` 
let mat34 = new Matrix(3,4);
let mat43 = new Matrix(4,3);
let result33 = mat34.multiply(mat43);
console.log(result33.stringify());
```
This methods will not modify the origin matrix and return new Matrix as result instead. The matrix used as a parameter and the original matrix must satisfy the matrix multiplicatio  rule, which means that the number of columns in the original matrix is equal to the number of rows in the parameter matrix.  
#### transpose
`Matrix.transpose(Matrix mat)`  
or  
`Matrix.prototype.transpose()`  
example:
```
let mat25 = new Matrix(2,5,[1,2,3,4,5,6,7,8,9,0]);
let mat52_1 = Matrix.transpose(mat25);
let mat52_2 = mat25.transpose();
```