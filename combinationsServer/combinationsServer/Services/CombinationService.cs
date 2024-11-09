using combinationsServer.Models;
using combinationsServer.Services;
using System.Diagnostics.Metrics;
using System.Numerics;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace combinationsServer
{
    public class CombinationService
    {
        private int counter;
        private int length;
        private int iPrev;
        private int iNext;
        private Combination[] allCombinations;
        private int[] currentCombination;
        private bool hasNext;
        private bool hasPrev;
        private int numberPage;
        private UtilityService utl;

        public CombinationService(int n, UtilityService utility)
        {
            if (n < 1 || n > 20)
            {
                throw new ArgumentException("the number must be between 1 and 20");
            }

            utl = utility;
            ResetArrCombination(n);
        }

        private void ResetArrCombination(int n)
        {
            currentCombination = new int[n];
            for (int i = 0; i < n; i++)
            {
                currentCombination[i] = i + 1;
            }
            length = n;
            counter =0;
            numberPage = 0;
            hasNext = true;
            hasPrev = false;
            numberPage = 0;
        }

        public BigInteger GetTotalCombinations()
        {
             return utl.Factorial(length);
        }
       
        public Combination GetNextCombination()
        {
            if (counter != 0)
            {
               hasNext= CheckNextCombination();
                if (!hasNext)
                {
                    return null;
                }
                CreateNextCombination();
            }
            hasPrev = true;
            counter++;
            return new Combination((int[])currentCombination.Clone(),counter, CheckNextCombination());
        }

        public Combination[] CalcBackCombinations(int pageSize, int lastPageSize, int counterLoop)
        {
            int count = 0;
            allCombinations = new Combination[pageSize];

            //אם הגענו לפונקציה מpagination
            if (counterLoop!=-1)
            {
                count = counterLoop;
            }
            //אם הגענו לעמוד אחרון שמציג רשימה אבל אחרי שנעשה Next בעמוד של הקומבינציה היחידה
            else if(lastPageSize != pageSize)
            {
                count = lastPageSize+ (pageSize-1);
            }
             //אם זה דף בודד אחורה כשמספר האלמנטים בעמוד הקודם זהה למספר האלמנטים המקסימלי בעמוד       
            else { 
                count = (pageSize * 2) - 1;
            }

            allCombinations= GetPrevAllCombinations(pageSize, lastPageSize, count);
            return allCombinations;
        }

        private Combination[] GetPrevAllCombinations(int pageSize,int lastPageSize, int counterLoop)
        {    
            while (counterLoop > 0 && hasPrev)
            {
                    hasPrev = CheckPrevCombination();
                    if (hasPrev)
                    {
                        CreatePrevCombination();
                        counter--;
                        if (counterLoop <= pageSize)
                        {
                            allCombinations[counterLoop - 1] = new Combination((int[])currentCombination.Clone(), counter, CheckNextCombination());
                        }
                    }
                    else
                    {
                        counter = 0;
                    }
                counterLoop--;
            }

            if (allCombinations[allCombinations.Length - 1] != null)
            {
                currentCombination =allCombinations[allCombinations.Length - 1].currentCombination;
                counter = allCombinations[allCombinations.Length - 1].combinationNumber;
            }
            numberPage--;
            hasNext = true;

            return allCombinations;
        }


        public Combination[] GetNextAllCombinations(int pageSize,int counterLoop)        
        {
            int count = 0;
            int skip = counterLoop;
            allCombinations = new Combination[pageSize];

            while (skip>0 && hasNext)
            {
                if (counter != 0)
                {
                    hasNext = CheckNextCombination();
                    if (hasNext)
                    {
                      CreateNextCombination();
                    }
                }
                if (counter == 0 || hasNext)
                {
                    skip--;
                    counter++;
                    if(skip < pageSize)
                    {
                        allCombinations[count] = new Combination((int[])currentCombination.Clone(), counter, CheckNextCombination());
                        count++;
                    }
                }
            }
            hasPrev = true;
            numberPage++;
            return allCombinations;
        }

        public Combination[] GetPagination(int page, int pageSize, int lastPageSize)
        {
            allCombinations=new Combination[pageSize];

            int count = 0;

            //מעבר לעמודים הבאים
             if (page>=numberPage)
            {
                count = (page - numberPage) * pageSize;
                allCombinations=GetNextAllCombinations(pageSize, count);
            }
             //מעבר לעמודים קודמים
            else
            {
                //אם נעשה Next לפני ההצגה כALL
                if (lastPageSize != pageSize)
                {
                    count = ((numberPage - (page+1)) * pageSize) +lastPageSize+ 1;
                }
                else
                {
                    count = ((numberPage - page) * pageSize) + 1;
                }
                allCombinations=GetPrevAllCombinations(pageSize, lastPageSize,count);
            }

            numberPage = page;
            return allCombinations;
        }




        private bool CheckNextCombination()
        {
            int i = currentCombination.Length - 2;

            while (i >= 0 && currentCombination[i] >= currentCombination[i + 1])
            {
                i--;

            }
            if (i < 0) return false;
            iNext = i;
            return true;
        }

        private void CreateNextCombination()
        {
            int j = currentCombination.Length - 1;
            while (currentCombination[j] <= currentCombination[iNext])
            {
                j--;
            }

            //1,2,3
            Swap(currentCombination, iNext, j);
            //1,3,2

            Array.Reverse(currentCombination, iNext + 1, currentCombination.Length - (iNext + 1));

        }

        private bool CheckPrevCombination()
        {
            int i = currentCombination.Length - 2;

            while (i >= 0 && currentCombination[i] <= currentCombination[i + 1])
            {
                i--;
            }

            if (i < 0) return false;
            iPrev = i;
            return true;
        }

        private void CreatePrevCombination(){

            int j = currentCombination.Length - 1;

            while (currentCombination[j] >= currentCombination[iPrev])
            {
                j--;
            }

            Swap(currentCombination, iPrev, j);

            Array.Reverse(currentCombination, iPrev + 1, currentCombination.Length - (iPrev + 1));
        }


        private void Swap(int[] arr, int i, int j)
        {
            int temp = currentCombination[i];
            currentCombination[i] = currentCombination[j];
            currentCombination[j] = temp;

        }

    }
}