let myArr = [12, 23, 1, 7, 2,8, 3, 2, 46, 10, 3, 6, 4, 5, 9];
 
quiclsort(myArr)
console.log(myArr);

function quiclsort(arr, left, right) {
    if(arr.length > 1) {
        left = typeof left != 'number' ? 0 : left;
        right = typeof right != 'number' ? arr.length - 1 : right;

        let position = partition(arr, left, right)

        if(left < position - 1) {
            quiclsort(arr, left, position - 1)
        }

        if(right > position) {
            quiclsort(arr, position, right)
        }
    }


    function partition(arr, left, right) {
        let pivot = arr[Math.floor((right + left) / 2)];

        while(left <= right) {
            while(arr[left] < pivot) {
                left++;
            }
            while(arr[right] > pivot) {
                right--;
            }
            if(left <= right) {
                swap(arr, left, right);
                left++;
                right--;
            }
        }
        return left;
    }

    function swap(arr, ind1, ind2) {
        let tmp = arr[ind1];
        arr[ind1] = arr[ind2];
        arr[ind2] = tmp;
    }
}