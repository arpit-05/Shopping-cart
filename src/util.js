export default function formalCurrency(num){
    return "$"+ Number(num.toFixed(1)).toLocaleString() + " ";
}