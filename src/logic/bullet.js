// import { gameSize } from "../constants";

export const createBullet = ({ damage, size, speed, owner, position }) => {
    return {
        damage, size, speed, owner, position, disabled: false,
        animate: function () {
            position.x += speed.x;
            position.y += speed.y;
            if (position.x < 0 || position.x > 3000 || position.y < 0 || position.y > 2000) {
                this.disabled = true;
            }
        }
    }
}
