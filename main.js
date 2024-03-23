import Matrix from './lib/Matrix.js'

function randomMatrixGenerate(i,j) {
    let times = i * j;
    let data = [];
    while(times > 0){
        data.push(Matrix.mathUtils.roundTo(Math.random() * 100,2));
        times -=1;
    };
    return new Matrix(i,j,data);
};