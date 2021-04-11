function run() {
  var input = document.getElementById("textbox").value;
  document.getElementById("ilen").innerHTML = input.length;
  document.getElementById("All").style.display = "none";
  document.getElementById("Best").style.display = "none";
  document.getElementById(document.getElementsByTagName("select")[0].value).style.display = "block";
  rle();
  huff();
  rice();
  arithmatic();
}

function rle() {
  var input = document.getElementById("textbox").value;
  var start = new Date().getTime();
  document.getElementById("outrle").innerHTML = "";
  var encoding = [];
  var prev, count, i;
  for (count = 1, prev = input[0], i = 1; i < input.length; i++) {
    if (input[i] != prev) {
      encoding.push([count, prev]);
      document.getElementById("outrle").innerHTML += prev + count;
      console.log("asdasd")
      count = 1;
      prev = input[i];
    }
    else
      count++;
  }
  encoding.push([count, prev]);
  var end = new Date().getTime();
  var time = end - start;
  console.log(encoding)
  document.getElementById("outrle").innerHTML += prev + count;
  document.getElementById("crrle").innerHTML = input.length / document.getElementById("outrle").innerHTML.length;
  document.getElementById("etrle").innerHTML = time + 'seconds';
  start = new Date().getTime();
  var decode = "";
  encoding.forEach(function (element) {
    decode += element[1].repeat(element[0]);
  });
  console.log(decode)
  end = new Date().getTime();
  var time = end - start;
  document.getElementById("decrle").innerHTML = decode;
  document.getElementById("dtrle").innerHTML = time + 'seconds';
  return encoding;

}

function huff() {
  var input = document.getElementById("textbox").value;
  var start = new Date().getTime();
  document.getElementById("outhuff").innerHTML = "";
  codes = {}
  var freqs = {};
  function frequency(str) {
    for (var i in str) {
      if (freqs[str[i]] == undefined) {
        freqs[str[i]] = 1;
      }
      else {
        freqs[str[i]] = freqs[str[i]] + 1;
      }
    }
    return freqs;
  }

  function sortfreq(freqs) {
    var tuples = [];
    for (var let in freqs) {
      tuples.push([freqs[let], let]);
    }
    return tuples.sort();
  }
  function buildTree(tuples) {
    while (tuples.length > 1) {
      leastTwo = [tuples[0][1], tuples[1][1]]
      theRest = tuples.slice(2, tuples.length);
      combFreq = tuples[0][0] + tuples[1][0];
      tuples = theRest;
      end = [combFreq, leastTwo];
      tuples.push(end);
      tuples.sort();
    }
    return tuples[0][1];
  }

  w = frequency(input);
  tuples = sortfreq(w);
  tree = buildTree(tuples);
  code = {};
  pat = '';
  //assiging codes to each letter
  function assignCode(node, pat) {
    if (typeof (node) == typeof (""))
      code[node] = pat;
    else {
      assignCode(node[0], pat + '0');
      assignCode(node[1], pat + '1');
    }
    if (typeof (node)) {
      return;
    }
  }
  assignCode(tree, pat);
  //console.log(code);
  function encode(string) {
    output = '';
    for (s in string)
      output += code[string[s]];
    return output;
  }
  encoded = encode(input);
  var end = new Date().getTime();
  var time = end - start;
  document.getElementById("outhuff").innerHTML = encoded;
  document.getElementById("crhuff").innerHTML = (input.length / document.getElementById("outhuff").innerHTML.length) * 8;
  document.getElementById("ethuff").innerHTML = time + 'seconds';
  start = new Date().getTime();
  //console.log("DECODING");
  function decode(tree,encoded)  
  {  
      output='';  
      p=tree;  
      for(bit in encoded)  
      {  
        if(encoded[bit]=='0')  
			p=p[0];  
        else  
			p=p[1];  
        if(typeof(p)==typeof(''))  
        {  
          output+=p;  
          p=tree;  
        }  
      }  
      return output;  
  }  
  decoded=decode(tree,encoded);  
  end = new Date().getTime();
  var time = end - start;
  document.getElementById("dechuff").innerHTML = decoded;
  document.getElementById("dthuff").innerHTML = time + 'seconds';
  return "";
}

function rice() {
  var input = stringToASCII(document.getElementById("textbox").value);
  var k = 4;
  var M = 2 ** 4;
  var array = input.split(' ');
  array = array.slice(0, -1);
  var output = []
  var start = new Date().getTime();
  array.forEach(function (x) {
    var code = (x & (M - 1)).toString(2);
    code = '0'.repeat(k - code.length) + code;
    code = unary(x >> k) + code;
    output.push(code);
  })
  var end = new Date().getTime();
  var time = end - start;
  document.getElementById("outrice").innerHTML = output.join('');
  document.getElementById("etrice").innerHTML = time + ' seconds';
  document.getElementById("crrice").innerHTML = (input.length / output.length) * 8;
  var decoded = '';
  start = new Date().getTime();
  output.forEach(function (x) {
    var Q = x.indexOf('0') + 1;
    var R = parseInt(x.slice(Q, Q + k), 2);
    var S = (Q * M) + R;
    decoded += String.fromCharCode(S);
  })
  end = new Date().getTime();
  time = end - start;
  document.getElementById("dtrice").innerHTML = time + ' seconds';
  console.log('Rice: ' + decoded)
}

function arithmatic() {
  var input = stringToASCII(document.getElementById("textbox").value);
  var start = 0;
  var width = 1;
  var start = new Date().getTime();
  for (var i = 0; i < input.length; i++) {
    if (input[i] !== ' ') {
      var dStart = 0.1 * input[i];
      start += (dStart * width);
      width *= 0.1;
    }
  }
  var encoded = Math.random(start, start + width + Number.MIN_VALUE);
  var end = new Date().getTime();
  var time = end - start;
  document.getElementById("outarith").innerHTML = encoded;
  document.getElementById("etarith").innerHTML = Math.abs(time) + ' seconds';
  document.getElementById("crarith").innerHTML = (input.length / `${encoded}`.length);
  console.log(start, end);
}

/*
0=>(0.0, 0.1)
1=>(0.1, 0.1)
2=>(0.2, 0.1)
3=>(0.3, 0.1)
4=>(0.4, 0.1)
5=>(0.5, 0.1)
6=>(0.6, 0.1)
7=>(0.7, 0.1)
8=>(0.8, 0.1)
9=>(0.9, 0.1)
*/

// Helper function for Rice encoding and Arithmatic encoding
function stringToASCII(str) {
  let output = '';
  for (var i = 0; i < str.length; i++) {
    output += str[i].charCodeAt(0) + ' ';
  }
  return output;
}

// Helper function for Rice encoding
function unary(n) {
  if (n == 0) {
    return '0';
  }
  return ('1').repeat(n - 1) + '0';
}