function qft(bits, values) {
  if (bits && bits instanceof Object) {
    values = bits; bits = values.length;
  }
  Q.comment(bits + "-bit Quantum Fourier Transform");
  if (values) Q.init(values);
  Q.barrier().brk();
  for (var i = 0; i < bits; i++) {
    for (var j = 0; j < i; j++) {
      Q.bit(i).cu1(Q.π.div(Math.pow(2, i-j)), j);
    }
    Q.bit(i).h().brk();
  }
};

//QUANTUM FOURIER TRANSFORM FROM A 8-qubit ARRAY;
var values = [1,0,1,0,1,0,1,0];
var Q = new QuantumJS();
Q.addFunction('qft', qft);
Q.fnc.qft(values);
var qasm = Q.compile();
console.log(qasm); 



//COMPILED QASM2.0
/*
x q[0];
x q[2];
x q[4];
x q[6];
barrier q;

h q[0];

cu1(pi/2) q[1],q[0];
h q[1];

cu1(pi/4) q[2],q[0];
cu1(pi/2) q[2],q[1];
h q[2];

cu1(pi/8) q[3],q[0];
cu1(pi/4) q[3],q[1];
cu1(pi/2) q[3],q[2];
h q[3];

cu1(pi/16) q[4],q[0];
cu1(pi/8) q[4],q[1];
cu1(pi/4) q[4],q[2];
cu1(pi/2) q[4],q[3];
h q[4];

cu1(pi/32) q[5],q[0];
cu1(pi/16) q[5],q[1];
cu1(pi/8) q[5],q[2];
cu1(pi/4) q[5],q[3];
cu1(pi/2) q[5],q[4];
h q[5];

cu1(pi/64) q[6],q[0];
cu1(pi/32) q[6],q[1];
cu1(pi/16) q[6],q[2];
cu1(pi/8) q[6],q[3];
cu1(pi/4) q[6],q[4];
cu1(pi/2) q[6],q[5];
h q[6];

cu1(pi/128) q[7],q[0];
cu1(pi/64) q[7],q[1];
cu1(pi/32) q[7],q[2];
cu1(pi/16) q[7],q[3];
cu1(pi/8) q[7],q[4];
cu1(pi/4) q[7],q[5];
cu1(pi/2) q[7],q[6];
h q[7];

measure q -> c;
*/