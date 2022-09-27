import { useState } from "react";
const useArray = (defaultValue) => {
    const [array, setArray] = useState(defaultValue);
    const push = (element) => {
        setArray(prev => [...prev, element]);
    };
    const filter = (callback) => {
        setArray(prev => prev.filter(callback));
    };
    const update = (index, newElement) => {
        setArray(prev => [
            ...prev.slice(0, index),
            newElement,
            ...prev.slice(index + 1, prev.length - 1)
        ]);
    };
    const remove = (index) => {
        setArray(prev => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1, prev.length - 1)
        ]);
    };
    return {
        value: array,
        push,
        remove,
        filter,
        update,
    };
};
export default useArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdGUvdXNlQXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUVoQyxNQUFNLFFBQVEsR0FBRyxDQUFJLFlBQWlCLEVBQUUsRUFBRTtJQUN0QyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUVoRCxNQUFNLElBQUksR0FBRyxDQUFDLE9BQVUsRUFBRSxFQUFFO1FBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUN4QyxDQUFDLENBQUE7SUFFRCxNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQTRDLEVBQUUsRUFBRTtRQUM1RCxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDM0MsQ0FBQyxDQUFBO0lBRUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFhLEVBQUUsVUFBYSxFQUFFLEVBQUU7UUFDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDYixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUN2QixVQUFVO1lBQ1YsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRSxDQUFDLENBQUM7U0FDM0MsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFBO0lBRUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNiLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO1lBQ3ZCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQzVDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtJQUVELE9BQU87UUFDSCxLQUFLLEVBQUUsS0FBSztRQUNaLElBQUk7UUFDSixNQUFNO1FBQ04sTUFBTTtRQUNOLE1BQU07S0FDVCxDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBR0QsZUFBZSxRQUFRLENBQUEifQ==