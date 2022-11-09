import * as sinon from 'sinon';
import { Model } from 'mongoose';
import Cars from '../../../models/carModel';
import * as carMock from '../../../../__tests__/utils/CarsMock';
import mongoose from 'mongoose';
import chai from 'chai';
const { expect } = chai;

const carMockWithId = { _id:'umidextremamentebom1308', ...carMock.validCar };
const carUpdateMockWithId = { _id:'umidextremamentebom1308', ...carMock.updatedCar };

describe('Cars Model', () => {
  const carModel = new Cars();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carUpdateMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carUpdateMockWithId);
  })

  after(()=>{
    sinon.restore();
  })

  describe('Testa o método create', () => {
    it('Cria um novo carro com sucesso', async () => {
      const result = await carModel.create(carMock.validCar);
      expect(result).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Testa o método find', () => {
    it('Pega todos os carros com sucesso', async () => {
      const result = await carModel.read();
      expect(result).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('Testa o método finOne', () => {
    it('Encontra o carro com sucesso', async () => {
      const id = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const result = await carModel.readOne('umidextremamentebom1308');
      expect(result).to.be.deep.equal(carMockWithId);
      id.restore();
    });

    it('Quando o id não é encontrado', async () => {
      try {
        await carModel.readOne('invalid');
      } catch (err: any) {
        expect(err.message).to.be.equal('InvalidMongoId');
      }
    });
  });

  describe('testa o método update', () => {
    it('Atualiza com sucesso', async () => {
      const id = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const result = await carModel.update('umidextremamentebom1308', carMock.updatedCar);
      expect(result).to.be.deep.equal(carUpdateMockWithId);
      id.restore();
    });

    it('Não atualiza sem um id não é encontrado', async () => {
      try {
        await carModel.update('ivalid', carUpdateMockWithId);
      } catch (err: any) {
        expect(err.message).to.be.equal('InvalidMongoId');
      }
    });
  });

  describe('testando o método delete', () => {
    it('deleta o carro com sucesso', async () => {
      const id = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const result = await carModel.delete('umidextremamentebom1308');
      expect(result).to.be.deep.equal(carUpdateMockWithId);
      id.restore();
    });

    it('Não deleta quando o id não é encontrado', async () => {
      try {
        await carModel.delete('invalid');
      } catch (err: any) {
        expect(err.message).to.be.equal('InvalidMongoId');
      }
    });
  });
});