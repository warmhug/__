/**
 * Created by hua on 15/1/28.
 */
import { Vehicle } from './Vehicle';

class Car extends Vehicle {

    move () {
        console.log(this.name + ' is spinning wheels...')
    }
}
export { Car }