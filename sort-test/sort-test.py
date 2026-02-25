#!/usr/bin/env python3
"""
快速排序算法实现 (Quick Sort)

快速排序是一种高效的分治排序算法，平均时间复杂度为 O(n log n)。
"""

def quick_sort(arr):
    """
    快速排序主函数
    
    参数:
        arr: 待排序的列表
    
    返回:
        排序后的新列表
    
    算法说明:
        1. 选择一个基准元素 (pivot)
        2. 将数组分为两部分: 小于基准的元素和大于基准的元素
        3. 递归地对两部分进行排序
        4. 合并结果
    """
    # 基础情况: 如果数组为空或只有一个元素，直接返回
    if len(arr) <= 1:
        return arr
    
    # 选择中间元素作为基准 (避免最坏情况)
    pivot = arr[len(arr) // 2]
    
    # 将数组分为三部分:
    # - left: 小于基准的元素
    # - middle: 等于基准的元素
    # - right: 大于基准的元素
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # 递归排序并合并结果
    return quick_sort(left) + middle + quick_sort(right)


def quick_sort_inplace(arr, low=0, high=None):
    """
    原地快速排序 (不创建新列表)
    
    参数:
        arr: 待排序的列表
        low: 起始索引
        high: 结束索引
    
    返回:
        排序后的列表 (原地修改)
    
    说明:
        这个版本在原数组上进行操作，空间复杂度更低
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # 分区并获取基准的最终位置
        pivot_index = partition(arr, low, high)
        
        # 递归排序左半部分和右半部分
        quick_sort_inplace(arr, low, pivot_index - 1)
        quick_sort_inplace(arr, pivot_index + 1, high)
    
    return arr


def partition(arr, low, high):
    """
    分区函数 - 将数组分为两部分
    
    参数:
        arr: 数组
        low: 起始索引
        high: 结束索引
    
    返回:
        基准元素的最终索引
    """
    # 选择最后一个元素作为基准
    pivot = arr[high]
    
    # i 指向小于基准的元素的最后一个位置
    i = low - 1
    
    # 遍历数组，将小于基准的元素移到左边
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # 将基准放到正确的位置
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    
    return i + 1


def test_quick_sort():
    """
    测试快速排序算法
    """
    print("=" * 50)
    print("快速排序算法测试")
    print("=" * 50)
    
    # 测试用例 1: 普通数组
    test1 = [64, 34, 25, 12, 22, 11, 90]
    print(f"\n测试 1 - 普通数组:")
    print(f"  原始数组: {test1}")
    result1 = quick_sort(test1.copy())
    print(f"  排序结果: {result1}")
    print(f"  ✓ 测试通过" if result1 == sorted(test1) else "  ✗ 测试失败")
    
    # 测试用例 2: 空数组
    test2 = []
    print(f"\n测试 2 - 空数组:")
    print(f"  原始数组: {test2}")
    result2 = quick_sort(test2.copy())
    print(f"  排序结果: {result2}")
    print(f"  ✓ 测试通过" if result2 == sorted(test2) else "  ✗ 测试失败")
    
    # 测试用例 3: 单元素数组
    test3 = [42]
    print(f"\n测试 3 - 单元素数组:")
    print(f"  原始数组: {test3}")
    result3 = quick_sort(test3.copy())
    print(f"  排序结果: {result3}")
    print(f"  ✓ 测试通过" if result3 == sorted(test3) else "  ✗ 测试失败")
    
    # 测试用例 4: 已排序数组
    test4 = [1, 2, 3, 4, 5]
    print(f"\n测试 4 - 已排序数组:")
    print(f"  原始数组: {test4}")
    result4 = quick_sort(test4.copy())
    print(f"  排序结果: {result4}")
    print(f"  ✓ 测试通过" if result4 == sorted(test4) else "  ✗ 测试失败")
    
    # 测试用例 5: 逆序数组
    test5 = [5, 4, 3, 2, 1]
    print(f"\n测试 5 - 逆序数组:")
    print(f"  原始数组: {test5}")
    result5 = quick_sort(test5.copy())
    print(f"  排序结果: {result5}")
    print(f"  ✓ 测试通过" if result5 == sorted(test5) else "  ✗ 测试失败")
    
    # 测试用例 6: 包含重复元素的数组
    test6 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
    print(f"\n测试 6 - 包含重复元素的数组:")
    print(f"  原始数组: {test6}")
    result6 = quick_sort(test6.copy())
    print(f"  排序结果: {result6}")
    print(f"  ✓ 测试通过" if result6 == sorted(test6) else "  ✗ 测试失败")
    
    # 测试用例 7: 包含负数的数组
    test7 = [-3, 5, -1, 0, 2, -4, 7]
    print(f"\n测试 7 - 包含负数的数组:")
    print(f"  原始数组: {test7}")
    result7 = quick_sort(test7.copy())
    print(f"  排序结果: {result7}")
    print(f"  ✓ 测试通过" if result7 == sorted(test7) else "  ✗ 测试失败")
    
    # 测试原地排序
    test8 = [3, 6, 8, 10, 1, 2, 1]
    print(f"\n测试 8 - 原地排序:")
    print(f"  原始数组: {test8}")
    result8 = quick_sort_inplace(test8.copy())
    print(f"  排序结果: {result8}")
    print(f"  ✓ 测试通过" if result8 == sorted(test8) else "  ✗ 测试失败")
    
    # 测试大型数组
    import random
    random.seed(42)
    test9 = [random.randint(1, 1000) for _ in range(100)]
    print(f"\n测试 9 - 大型数组 (100个随机元素):")
    print(f"  前10个元素: {test9[:10]}")
    result9 = quick_sort(test9.copy())
    print(f"  排序后前10个: {result9[:10]}")
    print(f"  ✓ 测试通过" if result9 == sorted(test9) else "  ✗ 测试失败")
    
    print("\n" + "=" * 50)
    print("所有测试完成!")
    print("=" * 50)


if __name__ == "__main__":
    # 运行测试
    test_quick_sort()
