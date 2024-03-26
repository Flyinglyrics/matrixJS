import Matrix from './lib/Matrix.js'

function randomMatrixGenerate(i,j) {
    let times = i * j;
    let data = [];
    while(times > 0){
        data.push(Matrix.mathUtils.roundTo(Math.random() * 100,0));
        times -=1;
    };
    return new Matrix(i,j,data);
};

const mat45 = randomMatrixGenerate(5,5);
console.log(mat45.toString());
let inver = mat45.inverse()
console.log(inver.toString());