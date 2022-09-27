import { useRef } from "react";
/** Returns the previous value of the passed state value */
const usePrevious = (value) => {
    const currentRef = useRef(value);
    const previousRef = useRef();
    if (currentRef.current !== value) {
        previousRef.current = currentRef.current;
        currentRef.current = value;
    }
    return previousRef.current;
};
export default usePrevious;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlUHJldmlvdXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdGUvdXNlUHJldmlvdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUU5QiwyREFBMkQ7QUFDM0QsTUFBTSxXQUFXLEdBQUcsQ0FBSSxLQUFRLEVBQUUsRUFBRTtJQUNoQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxFQUFLLENBQUE7SUFFL0IsSUFBSSxVQUFVLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtRQUM5QixXQUFXLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUE7UUFDeEMsVUFBVSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7S0FDN0I7SUFFRCxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUE7QUFDOUIsQ0FBQyxDQUFBO0FBRUQsZUFBZSxXQUFXLENBQUEifQ==