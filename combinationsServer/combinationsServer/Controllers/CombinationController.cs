using combinationsServer.Models;
using combinationsServer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace combinationsServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CombinationController : ControllerBase
    {
        private readonly CombinationSingleton _combinationSingleton;
        private readonly UtilityService _utility;
        public CombinationController(CombinationSingleton combinationState, UtilityService utility)
        {
            _combinationSingleton = combinationState;
            _utility = utility;
        }

        /// <summary>
        /// start/restart
        ///enter a number between 1-20
        /// </summary>
        /// <param name="n"></param>
        /// <returns></returns>
        [HttpGet("StartAPI")]
        public IActionResult StartAPI(int n)
        {
            try
            {
                _combinationSingleton.CombinationService = new CombinationService(n, _utility);
                BigInteger totalCombinations = _combinationSingleton.CombinationService.GetTotalCombinations();
                    
                return Ok(totalCombinations.ToString());
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);  

            }
        }

        /// <summary>
        /// gwt the next combination
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetNextAPI")]
        public IActionResult GetNextAPI()
        {
            try
            {
                if(_combinationSingleton.CombinationService == null)
                {
                    return BadRequest("Please call StartAPI first");
                }

                var nextCombination = _combinationSingleton.CombinationService.GetNextCombination();

                return Ok(nextCombination);   
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }


        /// <summary>
        /// Returns all combinations of the next page
        /// </summary>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet("GetAllAPI")]
        public IActionResult GetAllAPI(int pageSize)
        {
            try
            {
                if (_combinationSingleton.CombinationService == null)
                {
                    return BadRequest("Please call StartAPI first");

                }
                var allCombinations = _combinationSingleton.CombinationService.GetNextAllCombinations(pageSize,pageSize);

                return Ok(allCombinations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        /// <summary>
        /// Returns all combinations of the previous page
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="lastPageSize"></param>
        /// <returns></returns>
        [HttpGet("GetAllPrevAPI")]
        public IActionResult GetAllPrevAPI(int pageSize,int lastPageSize)
        {
            try
            {
                if (_combinationSingleton.CombinationService == null)
                {
                    return BadRequest("Please call StartAPI first");
                }
                Combination[] prevCombinations = _combinationSingleton.CombinationService.CalcBackCombinations(pageSize, lastPageSize,-1);

                return Ok(prevCombinations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }


        /// <summary>
        /// Returns all combinations on a specific page
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="lastPageSize"></param>
        /// <returns></returns>
        [HttpGet("GetPageinationAPI")]
        public IActionResult GetPageinationAPI(int pageNumber,int pageSize, int lastPageSize)
        {
            try
            {
                if (_combinationSingleton.CombinationService == null)
                {
                    return BadRequest("Please call StartAPI first");
                }
                var allCombinations = _combinationSingleton.CombinationService.GetPagination(pageNumber, pageSize,lastPageSize);


                return Ok(allCombinations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }


    }
}
