/**
 * @author gph
 * 
 */
export default class Matrix {
    /**
     * @param {...*} param
     * @example
     * new Matrix(); // create without any argument provided, will default create 4-rank identity matrix.
     * new Matrix(4,[...]); // create 4 rank square matrix, and transfer [...] as initial data.
     * new Matrix(3,4,[...]) | new Matrix([3,4],[...]); // create Matrix with 3 rows and 4 columns, and transfer [...] as initial data.
     * new Matrix([3,4]); // create Matrix with 3 rows and 4 columns without data transfered.
     * @description As no data provided, all element will be set to 0, which will returns Zero Matrix with specified rows and columns.
     */
    constructor(...param) {
        if(!Matrix.__checkNaN__(param)){
            throw "Argument Error!"
        }
        let {dat, rowNums, columnNums} = this.__construcor_overload__(param);
        Object.defineProperty(this,"rowNums",{
            value : rowNums,
            writable : false,
            enumerable : true
        })
        Object.defineProperty(this,"columnNums",{
            value : columnNums,
            writable : false,
            enumerable : true
        })
        Object.defineProperty(this,"__matrix__",{
            value : new Float64Array(dat),
            writable : false,
        })
    }
    /**
     * 
     * @description to support diversity input arguments
     * @returns {{dat:number[],columnNums:number,rowNums:number}}
     */
    __construcor_overload__(param) {
        let dat, rowNums, columnNums;
        switch(param.length) {
            case 0:
                rowNums = 4;
                columnNums = 4;
                dat = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
                break;
            case 1:
                if(typeof param[0] == 'number') {
                    rowNums = param[0];
                    columnNums = param[0];
                }else if(typeof param[0] == 'object') {
                    rowNums = param[0][0];
                    columnNums = param[0][1];
                }
                dat = [];
                while(dat.length < rowNums * columnNums) {
                    dat.push(0);
                }
                break;
            case 2:
                if(typeof param[0] == 'number') {
                    rowNums = param[0];
                    if(typeof param[1] == 'number') {
                        columnNums = param[1];
                        dat = [];
                        while(dat.length < rowNums * columnNums) {
                            dat.push(0);
                        };
                    }else if(typeof param[1] == 'object') {
                        columnNums = param[0];
                        dat = param[1];
                        if(dat.length > rowNums * columnNums) {
                            dat = dat.slice(0,rowNums * columnNums);
                        }
                        while(dat.length < rowNums * columnNums) {
                            dat.push(0);
                        }
                    }
                }else if(typeof param[0] == 'object') {
                    rowNums = param[0][0];
                    columnNums = param[0][1];
                    dat = param[1];
                    if(dat.length > rowNums * columnNums) {
                        dat = dat.slice(0,rowNums * columnNums);
                    }
                    while(dat.length < rowNums * columnNums) {
                        dat.push(0);
                    }
                }
                break;
            case 3:
                rowNums = param[0];
                columnNums = param[1];
                dat = param[2];
                if(dat.length > rowNums * columnNums) {
                    dat = dat.slice(0,rowNums * columnNums);
                }
                while(dat.length < rowNums * columnNums) {
                    dat.push(0);
                }
                break;
            default:
                throw "Argument Error"
        };
        return { dat, rowNums, columnNums };
    }
    /**
     * 
     * @param {*} item 
     * @returns {boolean}
     * @description check if the given parameter has any NaN.
     */
    static __checkNaN__(item) {
        let type = Object.prototype.toString.call(item);
        if (type != "[object Number]") {
            if(type == "[object Array]"||type == "[object Float64Array]"||type == "[object Float32Array]") {
                let arr = [];
                item.forEach(element => {
                    arr.push(Matrix.__checkNaN__(element));
                })
                return !arr.includes(false);
            }else if (type == "[object Object]" || type == "[object Arguments]"){
                let arr = [];
                let vals = Object.values(item);
                vals.forEach(element => {
                    arr.push(Matrix.__checkNaN__(element));
                })
                return !arr.includes(false);
            }else {
                return false
            }
        }else {
            return true
        }
    }
    /**
     * 
     * @param {Funtion} fn callback funtion being count costing time
     * @param {object} pointer Funtion.prototype.call(pointer,...param)
     * @param  {...any} param param to transfer to the callback funtion
     * @returns {number} cost
     */
    static timer(fn,pointer,...param) {
        let start = performance.now();
        // call function
        fn.call(pointer,...param);
        let end = performance.now();
        let cost = end - start;
        return cost
    }
    /**
     * @description column iterator.
     */
    get __columns__() {
        let valueIterator = this.__matrix__[Symbol.iterator]();
        return {
            next : () => {
                let result = new Float64Array(this.rowNums);
                for(let i = 0; i < this.rowNums; i += 1){
                    result[i] = valueIterator.next().value
                }
                return result.includes(NaN)? undefined : result
            }
        }
    }
    /**
     * 
     * @param {number} i 
     */
    column(i) {
        if(!Matrix.__checkNaN__(i) || i > this.columnNums || i <= 0){
            throw "Argument Error"
        }
        let it = this.__columns__;
        let result;
        for(let j = 0; j < i; j ++){
            result = it.next();
        }
        return result;
    }
    /**
     * @description row iterator.
     */
    get __rows__() {
        let nextRow = -1;
        return {
            next : () => {
                nextRow ++;
                let result = new Float64Array(this.columnNums);
                // let result = [];
                let j = 0;
                for (let i = nextRow; i <= ((this.columnNums - 1) * this.rowNums + nextRow); i += this.rowNums){
                    result[j] = this.__matrix__[i];
                    j ++;
                }
                return nextRow < this.rowNums? result : undefined
            }
        }
    }
    /**
     * 
     * @param {number} i 
     */
    row(i) {
        if(!Matrix.__checkNaN__(i) || i > this.rowNums || i <= 0){
            throw "Argument Error"
        }
        let it = this.__rows__;
        let result;
        for(let j = 0; j < i; j ++){
            result = it.next();
        };
        return result;
    }
    /**
     * @param {"webgl lowp"|"webgl mediump"|"webgl highp" } target
     */
    output(target) {
        switch(target) {
            case "webgl lowp" :
                return
            case "webgl mediump" :
                return new Float32Array(this.__matrix__);
            case "webgl highp" :
                return this.__matrix__
        }
    }
    /**
     * @description create a string of this matrix
     * @returns {String} string
     */
    stringify() {
        let rows = this.__rows__;
        let __pointer__ = rows.next();
        let matrix_console_string = "";
        while(__pointer__) {
            matrix_console_string += ("|" + __pointer__.toString() + "|\n")
            __pointer__ = rows.next();
        }
        return matrix_console_string;
    }
    /**
     * @param {number} i 
     * @param {number[]} dat
     * @description set the value of a full column
     */
    setColumn(i,dat) {
        if(!Matrix.__checkNaN__(arguments) || i <= 0 || i > this.columnNums) {
            throw "Argument Error";
        }
        if(dat.length < this.rowNums){
            while(dat.length < this.rowNums) {
                dat.push(0);
            }
        }else if(dat.length > this.rowNums) {
            dat.slice(0,this.rowNums)
        }
        let endIndex = i * this.rowNums - 1;
        let startIndex = i == 1 ? 0 : ( i - 1 ) * this.rowNums;
        let k = 0;
        for(let j = startIndex; j <= endIndex; j += 1) {
            this.__matrix__[j] = dat[k];
            k ++;
        }
    }
     /**
     * @param {number} i 
     * @param {number[]} dat
     * @description set the value of a full row
     */
     setRow(i,dat) {
        if(!Matrix.__checkNaN__(arguments) || i <= 0 || i > this.rowNums) {
            throw "Argument Error"
        }
        if(dat.length < this.columnNums){
            while(dat.length < this.columnNums) {
                dat.push(0);
            }
        }else if(dat.length > this.columnNums) {
            dat.slice(0,this.columnNums)
        }
        let k = 0;
        for(let j = i - 1; j <= ((this.columnNums - 1) * this.rowNums + i - 1); j += this.rowNums) {
            this.__matrix__[j] = dat[k];
            k ++ ;
        }
     }
    /**
     * 
     * @param {Matrix} matrix
     * @description will modify this matrix
     */
    add(matrix) {
        if (!matrix instanceof Matrix || this.columnNums != matrix.columnNums || this.rowNums != matrix.rowNums) {
            throw "Argument Error!"
        }
        for (let i = 0;i < this.columnNums * this.rowNums; i ++) {
            // this.__matrix__[i] += matrix.__matrix__[i];
            this.__matrix[i] = Matrix.mathUtils.preciseAdd(this.__matrix__[i],matrix.__matrix__[i]);
        }
        return this;
    }
    /**
     * @param {number} k 
     * @description will modify this matrix
     */
    scalarMultiply(k) {
        if(!Matrix.__checkNaN__(k)) {
            throw "Argument Error!"
        }
        for (let i = 0;i < this.columnNums * this.rowNums; i ++) {
            // this.__his.__matrix__[i] *= k;
            this.__matrix__[i] = Matrix.mathUtils.preciseMultiply(this.__matrix__[i],k);
        }
        return this;
    }
    /**
     * @param {number} k 
     * @description will modify this matrix
     */
    scalarDivide(k) {
        let j = 1/k;
        this.scalarMultiply(j);
    }
    /**
     * @param {Matrix} matrix
     * @description will modify this matrix
     */
    minus(matrix) {
        // As argument Matrix transfered will be modified by calling the method 'scalarMuliplt(-1)';
        this.add(matrix.scalarMultiply(-1));
        // So call the method 'scalarMuliplt(-1)' again to restore it.
        matrix.scalarMultiply(-1);
    }
    /**
     * 
     * @param {Matrix} matrix
     * @return {Matrix} result
     * @description outer product | matmul product; "A.multiply(B)" indicates A ⊗ B; return new Matrix
     */
    multiply(matrix) {
        if (!matrix instanceof Matrix || this.columnNums != matrix.rowNums) {
            throw "Argument Error!"
        };
        let result = new Matrix(this.rowNums,matrix.columnNums);
        let it1 = matrix.__columns__;
        let it1_column = it1.next();
        let k = 1;
        while(it1_column) {
            let it2 = this.__rows__;
            let arr3 = [];
            let val = 0;
            let it2_row = it2.next();
            // console.log("outer >> "k,"values >>",it1_column);
            while(it2_row) {
                for(let i = 0;i < this.columnNums;i ++){
                    // val += (it2_row[i] * it1_column[i]);
                    val = Matrix.mathUtils.preciseAdd(val,Matrix.mathUtils.preciseMultiply(it2_row[i] * it1_column[i]));
                };
                // console.log("inner>>>",it2_row);
                // debugger
                arr3.push(val);
                val = 0;
                it2_row = it2.next();
            }
            // console.log(arr3)
            result.setColumn(k,arr3);
            it1_column = it1.next();
            k++;
        }
        return result
    };
    /**
     * 
     * @param {Matrix} matrix
     * @return {Matrix} result
     * @description hadamard product; "A.hadamard_multiply(B)" indicates : A ⊙ B; return new Matrix
     */
    hadamard_multiply(matrix) {
        if (!matrix instanceof Matrix || this.columnNums != matrix.columnNums || this.rowNums != matrix.rowNums) {
            throw "Argument Error!"
        };
        let result = new Matrix(this.rowNums,this.columnNums)
        for (let i = 0;i < this.columnNums * this.rowNums; i ++) {
            // this.__matrix__[i] += matrix.__matrix__[i];
            result[i] = Matrix.mathUtils.preciseMultiply(this.__matrix__[i],matrix.__matrix__[i]);
        }
        return result;
    }
    /**
     * 
     * @param {Matrix} matrix 
     * @returns {number}
     * @description dot product | inner product | "A.dot_multply(B)" indicates A ⋅ B; return number
     */
    dot_multiply(matrix) {
        if (!matrix instanceof Matrix || this.columnNums != matrix.columnNums || this.rowNums != matrix.rowNums) {
            throw "Argument Error!"
        }
        let result;
        for (let i = 0;i < this.columnNums * this.rowNums; i ++) {
            // this.__matrix__[i] += matrix.__matrix__[i];
            result = Matrix.mathUtils.preciseAdd(result, Matrix.mathUtils.preciseMultiply(this.__matrix__[i],matrix.__matrix__[i]));
        }
        return result;
    }
    /**
     * 
     * @param {Matrix} mat 
     * @returns {Matrix}
     */
    static transpose(mat){
        let newMat = new Matrix(mat.columnNums,mat.rowNums);
        let row = mat.__rows__;
        for(let i = 1;i <= newMat.columnNums;i ++) {
            newMat.setColumn(i,row.next());
        }
        return newMat;
    }
    /**
     * 
     * @returns {Matrix}
     */
    transpose() {
        return Matrix.transpose(this);
    }
    /**
     * @param {number} rank order of the matrix
     * @returns {Matrix} matrix
     * @description get an identity matrix with specified rank
     */
    static getIdentityMatrix(rank) {
        let dat = [];
        for(let i = 0;i <= rank - 1; i ++){
            let column = [];
            while(column.length < rank) {
                column.push(0);
            }
            column[i] = 1;
            dat = [...dat,...column];
        }
        return new Matrix(rank,dat);
    }
    static mathUtils = {
        /**
         * 
         * @param {number} i 
         * @returns {number}
         * @description return decimal digits of the given float number
         */
        getDecimalsDigits(i) {
            return i.toString().split('.')[1].length
        },
        /**
         * 
         * @param {number} i 
         * @param {number} j 
         * @returns {number}
         */
        preciseAdd(i,j) {
            let n = this.getDecimalsDigits(i) > this.getDecimalsDigits(j)? this.getDecimalsDigits(i) : this.getDecimalsDigits(j);
            return (i * 10 ** n + j * 10 ** n)/10 ** n;
        },
        preciseMinus(i,j) {
            let n = this.getDecimalsDigits(i) > this.getDecimalsDigits(j)? this.getDecimalsDigits(i) : this.getDecimalsDigits(j);
            return (i * 10 ** n - j * 10 ** n)/10 ** n;
        },
        preciseMultiply(i,j) {
            let n = this.getDecimalsDigits(i) > this.getDecimalsDigits(j)? this.getDecimalsDigits(i) : this.getDecimalsDigits(j);
            return ((i * 10 ** n) * (j * 10 ** n))/10 ** n;
        },
        preciseDivide(i,j) {
            let n = this.getDecimalsDigits(i) > this.getDecimalsDigits(j)? this.getDecimalsDigits(i) : this.getDecimalsDigits(j);
            return ((i * 10 ** n) / (j * 10 ** n))/10 ** n;
        },
        roundTo(value,digit) {
            return Math.round(value * Math.pow(10,digit)) / Math.pow(10,digit);
        }
    }
}