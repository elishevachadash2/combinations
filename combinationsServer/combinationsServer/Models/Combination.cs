using static System.Runtime.InteropServices.JavaScript.JSType;

namespace combinationsServer.Models
{
    public class Combination
    {
        public int[] currentCombination { get; set; }
        public int combinationNumber { get; set; }
        public bool hasNext { get; set; }
        public Combination()
        {

        }
        public Combination(int[] currentCombination, int combinationNumber, bool hasNext)
        {
            this.currentCombination = currentCombination;
            this.combinationNumber = combinationNumber;
            this.hasNext=hasNext;

        }

    }
}
