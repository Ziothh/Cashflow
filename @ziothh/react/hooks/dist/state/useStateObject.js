import { useState } from "react";
// Todo: make overloads
const useStateObject = (defaultValue) => {
    const [state, setState] = useState(defaultValue);
    return {
        value: state,
        set: setState,
    };
};
export default useStateObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlU3RhdGVPYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdGUvdXNlU3RhdGVPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUVoQyx1QkFBdUI7QUFDdkIsTUFBTSxjQUFjLEdBQUcsQ0FBSSxZQUFlLEVBQWtCLEVBQUU7SUFDMUQsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFaEQsT0FBTztRQUNILEtBQUssRUFBRSxLQUFLO1FBQ1osR0FBRyxFQUFFLFFBQVE7S0FDaEIsQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQU9ELGVBQWUsY0FBYyxDQUFBIn0=