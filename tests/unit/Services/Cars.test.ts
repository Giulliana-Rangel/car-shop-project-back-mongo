import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarService from '../../../src/Services/CarService';

describe('Testing Cars route', function () {
  it('Should register a car', async function () {
    const carDataInput = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const output = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    Sinon.stub(Model, 'create').resolves(output);

    const service = new CarService();
    const result = await service.createCarRegister(carDataInput);
    
    expect(result).to.be.deep.equal(output);

    Sinon.restore();
  });
  it('Should list All Cars', async function () {
    const input = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const output = [
      {
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    ];
    Sinon.stub(Model, 'find').resolves([input]);

    const service = new CarService();
    const result = await service.findCars();

    expect(result).to.be.deep.equal(output);

    Sinon.restore();
  });

  it('Should list car by Id', async function () {
    const output = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const id = '6348513f34c397abcad040b2';

    Sinon.stub(Model, 'findById').resolves(output);

    const service = new CarService();
    const result = await service.findById(id);

    expect(result).to.be.deep.equal(output);

    Sinon.restore();
  });

  it('Should return cars update', async function () {
    const input = {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };
    const output = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };
    const id = '634852326b35b59438fbea2f';

    Sinon.stub(Model, 'findByIdAndUpdate').resolves({ ...output });

    const service = new CarService();
    const result = await service.updateById(id, input);

    expect(result).to.be.deep.equal(output);

    Sinon.restore();
  });

  it('Should delete a car', async function () {
    const id = '634852326b35b59438fbea2f';

    Sinon.stub(Model, 'findByIdAndDelete').resolves(null);

    const service = new CarService();
    const result = await service.removeById(id);

    expect(result).to.be.deep.equal(null);

    Sinon.restore();
  });

  it('Exception fails: invalid id', async function () {
    const id = 'nãoÉId';
    const output = 'Invalid mongo id';

    Sinon.stub(Model, 'findById').resolves({});
    
    try {
      const service = new CarService();
      await service.findById(id);
      await service.removeById(id);
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal(output);
    }
    Sinon.restore();
  });
  
  it('Exception fails: not found', async function () {
    const idFake = '634852326b35b59438aaaaaa';
    const output = 'Car not found';

    Sinon.stub(Model, 'findById').resolves({});
    Sinon.stub(Model, 'findByIdAndDelete').resolves({});

    try {
      const service = new CarService();
      await service.findById(idFake);
      await service.removeById(idFake);
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal(output);
      expect((error as Error).message).to.be.deep.equal(output);
    }
    Sinon.restore();
  });
});