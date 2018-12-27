package com.shuai.redis;/**
 * @author qs
 * @create 2018-11-29 14:28
 **/

import java.util.List;
import java.util.Set;

/**
 *
 * @author shuaion 2018/11/29
 **/
public interface RedisDao {

    <T> boolean add(final String key, final T obj);

    boolean add(final String key, final String value);

    <T> boolean add(final String key, final List<T> list);

    void delete(final String key);

    void delete(final List<String> keys);

    <T> boolean update(final String key, final T obj);

    boolean update(final String key, final String value);

    /**
     * 保存 不存在则新建，存在则更新
     *
     * @param key
     * @param value
     * @return
     */
    boolean save(final String key, final String value);

    <T> boolean save(final String key, final T obj);

    <T> T get(final String key, final Class clazz);

    <T> List<T> getList(final String key, final Class<T> clazz);

    byte[] getByte(final String key);

    String get(final String key);

    <T> void add(final String key, final long timeout, final T obj);

    void add(final String key, final long timeout, final byte[] object);

    Set<String> keys(String pattern);

    boolean exist(final String key);

    boolean set(final String key, final byte[] value);

    boolean flushDB();

    long dbSize();
}
