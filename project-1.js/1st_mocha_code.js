const mocha=require('mocha');

class Car{
    park(){
        return 's';
    }
    drive(){
        return 'd';
    }
}
let car;
beforeEach(()=>{
    car =new Car();
});
describe('Car', ()=>{
    it('can park',()=>{
        assert.equal(car.park(),'s');
    })
});
    describe('Car', ()=>{
        it('can drive',()=>{
            assert.equal(car.drive(),'d');
        });

});

