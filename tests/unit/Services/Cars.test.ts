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
});