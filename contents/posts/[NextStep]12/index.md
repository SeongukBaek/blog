---
title: "π 12μ₯ νμ₯μ± μλ DI νλ μμν¬λ‘ κ°μ "
description: "μλ° μΉ νλ‘κ·Έλλ° μ± μ λ¦¬"
date: 2022-02-23
update: 2022-02-23
tags:
  - Java
  - Refactoring
  - Framework
series: "π μλ° μΉ νλ‘κ·Έλλ° Next Step"
---

<em>[μλ° μΉ νλ‘κ·Έλλ° Next Step - λ°μ¬μ±]μ μ½κ³  μΈμ©νκ³  μ λ¦¬νλ POSTμλλ€.</em>

## π© νλμ setter λ©μλμ @Inject κΈ°λ₯ μΆκ°
### π§ μκ΅¬μ¬ν­
`@Inject` λ₯Ό νμ©ν΄ DIν¨μΌλ‘μ¨ λΉ κ°μ μμ‘΄κ΄κ³λ₯Ό μ½κ² μ°κ²°ν  μ μλ€. νμ§λ§ νμ¬λ μμ±μλ₯Ό ν΅ν΄μλ§ DIκ° κ°λ₯νλ€. λ°λΌμ μμ±μ μ΄μΈμ **νλ, `setter` λ©μλ**λ₯Ό ν΅ν΄μλ DIν  μ μλλ‘ κΈ°λ₯μ μΆκ°νλ€.
 
### π§ 1λ¨κ³ ννΈ - ν΄λμ€ μ€κ³
μμ±μ, νλ, `setter` λ©μλ, μ΄ 3κ°μ§μ κ²½μ°μ μκ° μλ€. μ§κΈκΉμ§ μ¬λ¬ κ²½μ°μ μκ° μλ κ²½μ° **μΆμν κ³Όμ μ ν΅ν΄ μΈν°νμ΄μ€λ₯Ό μΆκ°**ν ν κ° κ²½μ°μ λν κ΅¬νμ μννλ€.

`BeanFactory` μ μ­ν μ λΉμ μΆκ°νκ³ , μ‘°ννλ μ­ν λ§ λ¨κΈ°κ³  μμ±μλ₯Ό νμ©ν΄ DIλ₯Ό νκ³  μΈμ€ν΄μ€ μμ±μ `ConstructorInjector` λΌλ μ΄λ¦μΌλ‘ λΆλ¦¬νλ€.
- `Injector` λΌλ μΈν°νμ΄μ€λ₯Ό μΆκ°νλ€. μ΄λ μμ±μ, νλ, `setter` λ©μλ DIμ λν μΆμ λ©μλλ‘ `inject()` λ₯Ό κ°μ§λ€.
- μμ±μ, νλ, `setter` λ©μλμ λν DIλ₯Ό λ΄λΉνλ ν΄λμ€λ₯Ό κ΅¬ννλ€. μ΄λ `Injector` μΈν°νμ΄μ€λ₯Ό κ΅¬ννλ€.
  - 3κ°μ κ΅¬νμ²΄λ₯Ό κ΅¬ννλ κ³Όμ μμ λ°μνλ μ€λ³΅ μ½λλ€μ `Injector` μΈν°νμ΄μ€μ κ΅¬νμ²΄ μ¬μ΄μ `AbstractInjector` μ κ°μ μΆμ ν΄λμ€λ‘ μ κ±°νλ€.

### π§ 2λ¨κ³ ννΈ
μμ±μ κ΅¬νμ²΄(`ConstructorInjector`)λ `@Inject` κ° μ€μ λμ΄ μλ μμ±μλ₯Ό κ°μ§λ ν΄λμ€λ₯Ό μ°Ύλλ€.
- μμ±μμ μΈμμ ν΄λΉνλ λΉμ΄ `BeanFactory` μ λ±λ‘λμ΄ μλμ§ νμΈν΄λ³΄κ³  λ±λ‘λμ΄ μμ§ μλ€λ©΄ λΉ μΈμ€ν΄μ€λ₯Ό μμ±νμ¬ DIνλ€.

νλ κ΅¬νμ²΄(`FieldInjector`)μ `setter` λ©μλ κ΅¬νμ²΄(`SetterInjector`) λν κ°μ λ°©μμΌλ‘ κ΅¬ννλ€.
- νλ κ΅¬νμ²΄μ κ²½μ° ν΄λμ€μ `@Injector`κ° μ€μ λμ΄ μλ λͺ¨λ  νλλ₯Ό μ°Ύλλ€.
- νλ νμ(ν΄λμ€)μ ν΄λΉνλ λΉμ΄ λ±λ‘λμ΄ μλμ§ νμΈν΄λ³΄κ³  λ±λ‘λμ΄ μμ§ μλ€λ©΄ λΉ μΈμ€ν΄μ€λ₯Ό μμ±νμ¬ DIνλ€.

### π§ μ€λ³΅ μ κ±°λ₯Ό μν ννΈ
`@Injector` κ° μ€μ λμ΄ μλ μμΉκ° λ€λ₯΄λ€λ μ μ μ μΈνλ©΄, 3κ°μ κ΅¬νμ²΄μ λ‘μ§ μ²λ¦¬ κ³Όμ μ λμΌνλ€. 
- μ΄μ κ°μ΄ λ‘μ§μ΄ κ°μ κ²½μ° **ννλ¦Ώ λ©μλ ν¨ν΄**μ μ μ©ν  μ μλ€.
- λΆλͺ¨ ν΄λμ€μΈ `AbstractInjector` λ λ‘μ§ κ΅¬νμ λ΄λΉνκ³ , 3κ°μ νμ ν΄λμ€(κ΅¬νμ²΄)λ κ° ν΄λμ€λ§λ€ λ€λ₯Έ λΆλΆλ§μ κ΅¬ννλ€.

---

## π© νλμ setter λ©μλ @Inject κ΅¬ν
`ConstructorInjector` λ μ΄μ μ κ΅¬νν `BeanFactory` μ `instantiateClass()` , `instantiateConstructor()` λ©μλμ κ°λ€. 
- λ€λ₯Έ μ μ λΉμ μ μ₯νκΈ° μν `Map` μ μ§μ  κ°μ§μ§ μκ³  `BeanFactory` λ₯Ό ν΅ν΄ μ κ·Όνλλ‘ νλ€λ κ²μ΄λ€.
- `ConstructorInjector` μ `instantiateClass()` λ μμΌλ‘ μΆκ°ν  `FieldInjector` , `SetterInjector` λ νμνλ―λ‘, μ΄λ€μ μ€λ³΅ μ κ±°λ₯Ό μν ν΄λμ€μΈ `AbstractInjector` μμ κ΅¬ννλλ‘ νλ€.

```java
public abstract class AbstractInjector implements Injector {
    private BeanFactory beanFactory;

    public AbstractInjector(BeanFactory beanFactory) {
        this.beanFactory = beanFactory;
    }

    @Override
    public void inject(Class<?> clazz) {
        instantiateClass(clazz);
        Set<?> injectedBeans = getInjectedBeans(clazz);
        for (Object injectedBean : injectedBeans) {
            Class<?> beanClass = getBeanClass(injectedBean);
            inject(injectedBean, instantiateClass(beanClass), beanFactory);
        }
    }

    abstract Set<?> getInjectedBeans(Class<?> clazz);

    abstract Class<?> getBeanClass(Object injectedBean);

    abstract void inject(Object injectedBean, Object bean, BeanFactory beanFactory);

    private Object instantiateClass(Class<?> clazz) {
        Class<?> concreteClass = findBeanClass(clazz, beanFactory.getPreInstanticateBeans());
        Object bean = beanFactory.getBean(concreteClass);
        if (bean != null) {
            return bean;
        }

        Constructor<?> injectedConstructor = BeanFactoryUtils.getInjectedConstructor(concreteClass);

        if (injectedConstructor == null) {
            bean = BeanUtils.instantiate(concreteClass);
            beanFactory.registerBean(concreteClass, bean);
            return bean;
        }

        bean = instantiateConstructor(injectedConstructor);
        beanFactory.registerBean(concreteClass, bean);
        return bean;
    }

    private Object instantiateConstructor(Constructor<?> constructor) {
        Class<?>[] pTypes = constructor.getParameterTypes();
        List<Object> args = Lists.newArrayList();

        for (Class<?> clazz : pTypes) {
            Class<?> concreteClazz = BeanFactoryUtils.findConcreteClass(clazz, beanFactory.getPreInstanticateBeans());
            Object bean = beanFactory.getBean(concreteClazz);
            if (bean == null) {
                bean = instantiateClass(concreteClazz);
            }
            args.add(bean);
        }
        return BeanUtils.instantiateClass(constructor, args.toArray());
    }

    private Class<?> findBeanClass(Class<?> clazz, Set<Class<?>> preInstanticateBeans) {
        Class<?> concreteClazz = BeanFactoryUtils.findConcreteClass(clazz, preInstanticateBeans);
        if (!preInstanticateBeans.contains(concreteClazz)) {
            throw new IllegalStateException(clazz + "λ Beanμ΄ μλλ€.");
        }
        return concreteClazz;
    }
}
```

- `BeanFactory` μ `private` μμλ€μ λν μ κ·Όμ μν΄ `BeanFactory` μ μ μΈν `getBean()` , `getPreInstanticateBeans()` , `registerBean()` λ©μλλ₯Ό νμ©νλ€.

```java
public class ConstructorInjector extends AbstractInjector {
    public ConstructorInjector(BeanFactory beanFactory) {
        super(beanFactory);
    }

    @Override
    Set<?> getInjectedBeans(Class<?> clazz) {
        return Sets.newHashSet();
    }

    @Override
    Class<?> getBeanClass(Object injectedBean) {
        return null;
    }

    @Override
    void inject(Object injectedBean, Object bean, BeanFactory beanFactory) {
    }
}
```

- `ConstructorInjector` λ κ΅¬ν λ‘μ§μ΄ λͺ¨λ `AbstractInjector` λ‘ μ΄λνμΌλ―λ‘ κ°λ¨νλ€.

```java
public class FieldInjector extends AbstractInjector {
    private static final Logger log = LoggerFactory.getLogger(FieldInjector.class);

    public FieldInjector(BeanFactory beanFactory) {
        super(beanFactory);
    }

    @Override
    Set<?> getInjectedBeans(Class<?> clazz) {
        return BeanFactoryUtils.getInjectedFields(clazz);
    }

    @Override
    Class<?> getBeanClass(Object injectedBean) {
        Field field = (Field)injectedBean;
        return field.getType();
    }

    @Override
    void inject(Object injectedBean, Object bean, BeanFactory beanFactory) {
        Field field = (Field) injectedBean;
        try {
            field.setAccessible(true);
            field.set(beanFactory.getBean(field.getDeclaringClass()), bean);
        } catch (IllegalAccessException | IllegalArgumentException e) {
            log.error(e.getMessage());
        }
    }
}
```

```java
public class SetterInjector extends AbstractInjector {
    private static final Logger log = LoggerFactory.getLogger(SetterInjector.class);

    public SetterInjector(BeanFactory beanFactory) {
        super(beanFactory);
    }

    @Override
    Set<?> getInjectedBeans(Class<?> clazz) {
        return BeanFactoryUtils.getInjectedMethods(clazz);
    }

    @Override
    Class<?> getBeanClass(Object injectedBean) {
        Method method = (Method) injectedBean;
        Class<?>[] paramTypes = method.getParameterTypes();
        if (paramTypes.length != 1) {
            throw new IllegalStateException("DIν  λ©μλ μΈμλ νλμ¬μΌ ν©λλ€.");
        }
        return paramTypes[0];
    }

    @Override
    void inject(Object injectedBean, Object bean, BeanFactory beanFactory) {
        Method method = (Method) injectedBean;
        try {
            method.invoke(beanFactory.getBean(method.getDeclaringClass()), bean);
        } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
            log.error(e.getMessage());
        }
    }
}
```

ννλ¦Ώ λ©μλ ν¨ν΄μ μ μ©ν΄ λ‘μ§ μ€λ³΅μ μ κ±°νμ¬ νμ ν΄λμ€μ κ΅¬νμ΄ λ§€μ° κ°λ¨ν΄μ‘λ€. μ΄μ  `BeanFactory` κ° λ°©κΈκΉμ§ κ΅¬νν 3κ°μ `Injector` λ₯Ό μ¬μ©νλλ‘ λ¦¬ν©ν λ§νλ€.

```java
public class BeanFactory {
    private static final Logger logger = LoggerFactory.getLogger(BeanFactory.class);

    private Set<Class<?>> preInstanticateBeans;

    private Map<Class<?>, Object> beans = Maps.newHashMap();

    private List<Injector> injectors;

    public BeanFactory(Set<Class<?>> preInstanticateBeans) {
        this.preInstanticateBeans = preInstanticateBeans;

        injectors = Arrays.asList(
                new FieldInjector(this),
                new SetterInjector(this),
                new ConstructorInjector(this)
        );
    }

    public void initialize() {
        for (Class<?> clazz : preInstanticateBeans) {
            if (beans.get(clazz) == null) {
                logger.debug("instantiated Class : {}", clazz);
                inject(clazz);
            }
        }
    }

    private void inject(Class<?> clazz) {
        for (Injector injector : injectors) {
            injector.inject(clazz);
        }
    }
    ...

}
```

- `BeanFactory` μμ±μ νΈμΆ μ, κ΅¬νν `Injector` λ€μ μ΄κΈ°νν΄μ£Όκ³ , `initialize()` λ©μλ νΈμΆλ‘, μ΄κΈ°νν `Injector` λ€μ λν DIλ₯Ό μννλ€.

---

## π© @Inject κ°μ 
`BeanFactory` μ `AbstractInjector` μ½λλ₯Ό λ³΄λ©΄, μ€λ³΅μ μ κ±°νκΈ°λ νμ§λ§ μμ€ μ½λμ μ΄ν΄λκ° λ¨μ΄μ§λ€. λν, νμ¬ λͺ¨λ  λΉκ³Ό κ΄λ ¨ν μ λ³΄λ `BeanFactory` κ° κ΄λ¦¬νλλ°, λΉ μΈμ€ν΄μ€ μμ±κ³Ό μ£Όμμ `Injector` κ΅¬ν ν΄λμ€κ° λ΄λΉνλ κ΅¬μ‘°μ¬μ `BeanFactory` μκ² μΌμ μν€λ κ²μ΄ μλ **λΉ μ λ³΄ μ‘°ν**κ° κ³μ λ°μνλ€.
- μ¦, `BeanFactory` κ°μ²΄μ νμ©λκ° λ¨μ΄μ§λ κ΅¬μ‘°μ΄λ€.
- νμ©λλ₯Ό λμ΄κΈ° μν΄ λΉ μΈμ€ν΄μ€ μμ±κ³Ό μ£Όμ μμμ `BeanFactory` κ°, νμ¬ λΉ ν΄λμ€μ μν μ λ³΄λ₯Ό λ³λμ ν΄λμ€λ‘ μΆμν(`BeanDefinition`)ν΄ κ΄λ¦¬νκ²λ νλ€.
- μ€μ λ annotationμ μλ ν΄λμ€λ₯Ό μ‘°ννλ μ­ν μ νλ `BeanScanner` ν΄λμ€μ μ΄λ¦λ `ClasspathBeanDefinitionScanner` λ‘ renameνλ€.
    - μ΄λ annotationμ΄ μ€μ λ ν΄λμ€λ₯Ό μ‘°νν ν `BeanDefinition` μ μμ±ν΄ `BeanFactory` μ μ λ¬νλ€. μ΄λ, `ClasspathBeanDefinitionScanner` μ `BeanFactory` κ° κ°ν μμ‘΄κ΄κ³λ₯Ό κ°μ§μ§ μλλ‘ μ€κ³νλ€. (`BeanDefinition` μ `BeanFactory` μ μ λ¬νλ λΆλΆμμλ§ λ°μνλλ‘ κ΅¬ν, `BeanDefinition` μ μ μ₯νλ μΈν°νμ΄μ€(`BeanDefinitionRegistry`)λ₯Ό μΆκ°νμ¬ μμ‘΄κ΄κ³λ₯Ό λμ¨νκ²!)
    - μ¦, `BeanFactory` λ **`BeanDefinition` μ μ μ₯νλ μ μ₯μ μ­ν **κ³Ό **`BeanDefinition` μ νμ©ν΄ λΉ μΈμ€ν΄μ€ μμ±, μμ‘΄κ΄κ³ μ£Όμμ λ΄λΉνλ μ­ν **λ‘ λλλ€.

```java
public interface BeanDefinitionRegistry {
    void registerBeanDefinition(Class<?> clazz, BeanDefinition beanDefinition);
}
```

```java
public class ClasspathBeanDefinitionScanner {
    private final BeanDefinitionRegistry beanDefinitionRegistry;

    public ClasspathBeanDefinitionScanner(BeanDefinitionRegistry beanDefinitionRegistry) {
        this.beanDefinitionRegistry = beanDefinitionRegistry;
    }

    @SuppressWarnings("unchecked")
    public void doScan(Object... basePackages) {
        Reflections reflections = new Reflections(basePackages);
        Set<Class<?>> beanClasses = getTypesAnnotatedWith(reflections, Controller.class, Service.class, Repository.class);
        for (Class<?> clazz : beanClasses) {
            beanDefinitionRegistry.registerBeanDefinition(clazz, new BeanDefinition(clazz));
        }
    }

    @SuppressWarnings("unchecked")
    private Set<Class<?>> getTypesAnnotatedWith(Reflections reflections, Class<? extends Annotation>... annotations) {
        Set<Class<?>> preInstantiatedBeans = Sets.newHashSet();
        for (Class<? extends Annotation> annotation : annotations) {
            preInstantiatedBeans.addAll(reflections.getTypesAnnotatedWith(annotation));
        }
        return preInstantiatedBeans;
    }
}
```

- μ΄λ‘μ¨, κ° κ°μ²΄μ μ­ν μ λΆλ¦¬νλ€.
  - `ClasspathBeanDefinitionScanner` λ ν΄λμ€ν¨μ€μμ λΉμ μ‘°ν(`getTypesAnnotatedWith()`)νλ μ­ν μ λ΄λΉνκ³ ,
  - μ‘°νν λΉ μ λ³΄λ₯Ό `BeanDefinition` μ μμ±ν΄ `beanDefinitionRegistry` μ μ λ¬(`beanDefinitionRegistry.registerBeanDefinition(clazz, new BeanDefinition(clazz));`)
  - `BeanDefinitionRegistry` κ΅¬νμ²΄κ° `BeanDefinition` μ μ μ₯μ μ­ν μ λ΄λΉνλ€.

`BeanFactory` λ λΉ μΈμ€ν΄μ€λ₯Ό μμ±νκ³ , μμ‘΄κ΄κ³ μ£Όμμ μν΄μλ `BeanDefinition` μ λ³΄κ° νμνλ€. 
- μ΄λ `BeanFactory` κ° `BeanDefinitionRegistry` κ΅¬νμ²΄λ‘ `BeanDefinition` μ λ³΄λ₯Ό κ΄λ¦¬νλλ‘ κ΅¬ννλ€.

```java
public class BeanFactory implements BeanDefinitionRegistry {
    private static final Logger logger = LoggerFactory.getLogger(BeanFactory.class);
    ...

    private Map<Class<?>, BeanDefinition> beanDefinitions = Maps.newHashMap();
    ...

    public void initialize() {
        for (Class<?> clazz : getBeanClasses()) {
            getBean(clazz);
        }
    }

    public Set<Class<?>> getBeanClasses() {
        return beanDefinitions.keySet();
    }

    @Override
    public void registerBeanDefinition(Class<?> clazz, BeanDefinition beanDefinition) {
        logger.debug("register bean : {]", clazz);
        beanDefinitions.put(clazz, beanDefinition);
    }
}
```

`BeanFactory` μ `ClasspathBeanDefinitionScanner` μ μμ‘΄κ΄κ³μ λν μ°κ²°μ μ΄ λ ν΄λμ€λ₯Ό νμ©νλ κ³³μμ λ΄λΉνλ€. μ§κΈκΉμ§λ `AnnotationHandlerMapping` μ΄ μ΄λ₯Ό λ΄λΉνλ€.

```java
public class AnnotationHandlerMapping implements HandlerMapping {
    private static final Logger logger = LoggerFactory.getLogger(AnnotationHandlerMapping.class);

    private Object[] basePackage;

    private Map<HandlerKey, HandlerExecution> handlerExecutions = Maps.newHashMap();

    public AnnotationHandlerMapping(Object... basePackage) {
        this.basePackage = basePackage;
    }

    public void initialize() {
        BeanFactory beanFactory = new BeanFactory();
        ClasspathBeanDefinitionScanner scanner = new ClasspathBeanDefinitionScanner(beanFactory);
        scanner.doScan(basePackage);
        beanFactory.initialize();
        ...

    }
    ...

}
```

`BeanFactory` μ `ClasspathBeanDefinitionScanner` μ μμ‘΄κ΄κ³ λν DIλ₯Ό νμ©ν΄ κ΅¬ννμ¬ μ μ°μ±μ νλ³΄νλ€. 
- `ClasspathBeanDefinitionScanner` λ λ¨μν ν΄λμ€ ν¨μ€μμ λΉμ μ‘°νν ν `BeanDefinition` μ μμ±ν΄ `BeanDefinitionRegistry` μ `registerBeanDefinition()` λ©μλλ‘ μ λ¬νλ μ­ν μ λ΄λΉνλ€.
- νμ§λ§, μ΄ κ²½μ° **κ°μ²΄ κ°μ DIλ₯Ό λ΄λΉν  μ½λκ° νμ**νλ€λ λ¨μ μ΄ μλ€. 
  - κ°μ²΄ κ°μ μμ‘΄κ΄κ³λ₯Ό μ°κ²°νμ§ μμ μ±λ‘ APIλ₯Ό μ κ³΅νλ©΄, μ΄λ₯Ό μ¬μ©νλ κ°λ°μλ μΌμΌμ΄ DIλ₯Ό ν΄μ€μΌ νλ€.
- μ΄λ¬ν λ¨μ  λ³΄μμ μν΄ **κ°μ²΄ κ°μ DIλ₯Ό λ΄λΉνλ μλ‘μ΄ κ°μ²΄λ₯Ό μΆκ°**νλ€. (`ApplicationContext`)

```java
public class ApplicationContext {
    private BeanFactory beanFactory;
    
    public ApplicationContext(Object... basePackages) {
        beanFactory = new BeanFactory();
        ClasspathBeanDefinitionScanner scanner = new ClasspathBeanDefinitionScanner(beanFactory);
        scanner.doScan(basePackages);
        beanFactory.initialize();
    }
    
    public <T> T getBean(Class<T> clazz) {
        return beanFactory.getBean(clazz);
    }
    
    public Set<Class<?>> getBeanClasses() {
        return beanFactory.getBeanClasses();
    }
} 
```

- `BeanFactory` μ΄κΈ°ν κ³Όμ μ `ApplicationContext` λ‘ μ?κΈ°κ³ , `BeanFactory` λ‘ μ§μ  μ κ·Όνλ APIλ₯Ό `ApplicationContext` λ₯Ό ν΅ν΄ μ κ·Όνλλ‘ λ¦¬ν©ν λ§νλ€.
  - μ΄λ, `BeanFactory` κ° λ΄λΉνλ `getControllers()` λ©μλμ μ­ν μ΄ μ ν©νμ§ μμ μ΄λ₯Ό `AnnotationHandlerMapping` μΌλ‘ μ΄λνκ³  κ΅¬νμ μν΄ νμν κΈ°λ₯λ§ `ApplicationContext` λ₯Ό ν΅ν΄ μ κ·Όνλλ‘ κ΅¬ννλ€.

```java
public class AnnotationHandlerMapping implements HandlerMapping {
    ...

    public void initialize() {
        ApplicationContext ac = new ApplicationContext(basePackage);
        Map<Class<?>, Object> controllers = getControllers(ac);
        ...

    }

    private Map<Class<?>, Object> getControllers(ApplicationContext ac) {
        Map<Class<?>, Object> controllers = Maps.newHashMap();
        for (Class<?> clazz : ac.getBeanClasses()) {
            Annotation annotation = clazz.getAnnotation(Controller.class);
            if (annotation != null) {
                controllers.put(clazz, ac.getBean(clazz));
            }
        }
        return controllers;
    }
}
```

- κ°μ²΄ κ°μ μμ‘΄κ΄κ³ μ°κ²°μ λ΄λΉνλλ‘ κ΅¬ννμ¬ λ μ΄μ `BeanFactory` λ₯Ό μ¬μ©νλ κ°λ°μκ° μμ‘΄κ΄κ³λλ¬Έμ λ¨Έλ¦¬ μννμ§ μμλ λλ€.
- λΉ ν΄λμ€ μ λ³΄λ₯Ό λ΄κ³  μλ `BeanDefinition` μ μμ±μλ‘ μ λ¬λλ ν΄λμ€μμ `@Inject` κ° μ΄λ»κ² μ€μ λμ΄ μλμ§μ λ°λΌ `InjectType` μ κ²°μ νλ€. (`enum` μ¬μ©)
  - μ΄λ, `InjectType` μμλ νλμ `setter` λ©μλλ₯Ό νμ©ν `@Inject` λ λμΌνκ² μ·¨κΈνλλ°, μ΄λ λ΄λΆ κ΅¬νμ μ°¨μ΄κ° μκΈ° λλ¬Έμ΄λ€.
- λΉ ν΄λμ€ μ λ³΄λ₯Ό νμ©ν΄ λΉ μΈμ€ν΄μ€λ₯Ό μμ±νκ³  μμ‘΄κ΄κ³ μ£Όμμ λ΄λΉνλ `BeanFactory` λ λΉ ν΄λμ€μ μμ‘΄κ΄κ³μ κ΄λ ¨ν μ λ³΄ μ²λ¦¬λ₯Ό λͺ¨λ `BeanDefinition` μκ² μμνμ¬ λ΄λΉν  μ±μμ΄ μ€μλ€.

---

## π© μ€μ  μΆκ°λ₯Ό ν΅ν μ μ°μ± νλ³΄
μ§κΈκΉμ§ κ΅¬νν μ½λλ₯Ό λΉνμ μΈ μκ°μΌλ‘ λΆμνμλ, μλμ κ°μ κ°μ μ¬ν­λ€μ΄ λ³΄μΈλ€.
- `DispatcherServlet` μ `init()` λ©μλλ₯Ό λ³΄λ©΄ `"next"` λΌλ ν¨ν€μ§ μ΄λ¦μ΄ νλ μ½λ©λμ΄ μλ€. κΈ°λ³Έ ν¨ν€μ§λͺμ μΈλΆμμ μ λ¬ν  μ μλλ‘ κ΅¬ννλ€.
- `JdbcTemplate` μ΄ μμ§κΉμ§ μ±κΈν€ ν¨ν΄μΌλ‘ κ΅¬νλμ΄ μλ€. μ΄λ₯Ό DI νλ μμν¬μ λΉμΌλ‘ λ±λ‘ν΄ κ΄λ¦¬ν¨μΌλ‘μ¨, μ±κΈν€ ν¨ν΄μ μ κ±°νλ€. 
  - μ΄λ, κ° λ μ΄μ΄μ λͺνν μΌμΉνμ§ μλ λΉμ μ§μνλ annotationμ μΆκ°ν  νμκ° μλ€.
- DB Connectionμ μμ±νλ λΆλΆλ `static` μΌλ‘ κ΅¬νλμ΄ μλ€. λν DB μ€μ  μ λ³΄λ νλ μ½λ©μΌλ‘ κ΄λ¦¬λμ΄ νΉμ  DBμ μ’μλλ κ΅¬μ‘°μ΄λ€. μ΄λ¬ν κ΅¬μ‘°λ₯Ό λ²μ΄λκ³ , **Connection Pooling**μ μ§μνκΈ° μν΄ `Connection` λμ  `javax.sql.DataSource` μΈν°νμ΄μ€μ μμ‘΄κ΄κ³λ₯Ό κ°μ§λλ‘ κ°μ νλ€.

μΈλ²μ§Έ μ΄μλ `DataSource` κ΅¬νμ²΄λ‘ Apache Commonsμμ μ κ³΅νλ DBCP λΌμ΄λΈλ¬λ¦¬λ₯Ό νμ©ν΄ DB μ€μ ν ν λΉμΌλ‘ λ±λ‘νλ©΄ ν΄κ²°μ΄ κ°λ₯νλ€.
- μ§κΈκΉμ§λ λͺ¨λ μ§μ  κ΅¬νν ν΄λμ€λ₯Ό λΉμΌλ‘ λ±λ‘νκΈ°μ annotation μ€μ μ΄ κ°λ₯νλ€.
- νμ§λ§ DBCP κ΅¬νμ²΄μ κ²½μ° μΈλΆ λΌμ΄λΈλ¬λ¦¬μ΄κΈ°λλ¬Έμ μμ μ΄ λΆκ°λ₯νλ€. μΈλΆ λΌμ΄λΈλ¬λ¦¬ μ¬μ©μ μν΄ κ΅¬νμ²΄λ₯Ό μμν΄ λΉ μ€μ μ νλ©΄ ν΄κ²°μ΄ κ°λ₯νμ§λ§, λ§€λ² μ΄λ¬ν κ³Όμ μ κ±°μΉλ κ²μ ν¨μ¨μ μ΄μ§ λͺ»νλ€.
- λ°λΌμ, μ²«λ²μ§Έμ λλ²μ§Έ μ΄μλΆν° κ°μ νλλ‘ νλ€.

### π§ ServletContainerInitializerλ₯Ό νμ©ν΄ web.xml μμ΄ μΉ κ°λ°νκΈ°
**μ²«λ²μ§Έ μ΄μ**<br/>
: μλΈλ¦Ώμ μΈμλ₯Ό μ λ¬ν¨μΌλ‘μ¨ ν΄κ²°μ΄ κ°λ₯νλ€.

μλΈλ¦Ώ μ»¨νμ΄λμ κ²½μ°, `web.xml` μ€μ μ ν΅ν΄ μλΈλ¦Ώμ μΈμλ₯Ό μ λ¬ν  μ μλ€. νμ§λ§ μλΈλ¦Ώ 3.0 μ΄ν λ²μ μμλ `web.xml` μ μ¬μ©νμ§ μκ³ λ μ€μ μ΄ κ°λ₯νλ°, μ΄λ `ServletContainerInitializer` μΈν°νμ΄μ€λ₯Ό κ΅¬νν¨μΌλ‘μ¨ κ°λ₯νλ€.

μΈν°νμ΄μ€λ₯Ό κ΅¬ννλ €λ©΄, λ¨Όμ  νμ₯μ μν΄ μμ²΄μ μΌλ‘ μ¬μ©ν  μΈν°νμ΄μ€λ₯Ό μ μνλλ‘ νλ€. (`WebApplicationInitializer`)

```java
public interface WebApplicationInitializer {
    void onStartup(ServletContext servletContext) throws ServletException;
}
```

μ μΈν°νμ΄μ€μ λν κ΅¬νμ²΄λ₯Ό κ΅¬ννλ€. (`MyServletContainerInitializer`)

```java
@HandlesTypes(WebApplicationInitializer.class)
public class MyServletContainerInitializer implements ServletContainerInitializer {
    @Override
    public void onStartup(Set<Class<?>> webAppInitializerClasses, ServletContext servletContext) throws ServletException {
        List<WebApplicationInitializer> initializers = new LinkedList<>();

        if (webAppInitializerClasses != null) {
            for (Class<?> waiClass : webAppInitializerClasses) {
                try {
                    initializers.add((WebApplicationInitializer) waiClass.newInstance());
                } catch (Throwable ex) {
                    throw new ServletException("WebApplicationInitializer classλ₯Ό μΈμ€ν΄μ€ννλλ° μ€ν¨νμ΅λλ€.", ex);
                }
            }
        }
        
        if (initializers.isEmpty()) {
            servletContext.log("classpathμμ κ°μ§λ Spring WebApplicationInitializer typesκ° μμ΅λλ€.");
            return;
        }
        
        for(WebApplicationInitializer initializer : initializers) {
            initializer.onStartup(servletContext);
        }
    }
}
```

- μλΈλ¦Ώ μ»¨νμ΄λλ ν΄λμ€ν¨μ€μ μ‘΄μ¬νλ ν΄λμ€ μ€ `WebApplicationInitializer` μΈν°νμ΄μ€λ₯Ό κ΅¬ννλ λͺ¨λ  κ΅¬νμ²΄λ₯Ό μ°Ύμ `MyServletContainerInitializer` μ `onStartup()` λ©μλ μΈμλ‘ μ λ¬νλ€.
- ν΄λΉ λ©μλλ μλΈλ¦Ώ μ»¨νμ΄λμ μ λ¬ν `WebApplicationInitializer` μ `onStartup()` λ©μλλ₯Ό μ€ννλ€.

> `WebApplicationInitializer` μΈν°νμ΄μ€λ₯Ό κ΅¬νν¨μΌλ‘μ¨ μλΈλ¦Ώ μ»¨νμ΄λμ μ΄κΈ°ν κ³Όμ μ νμ₯ν  μ μκ² λμλ€.

`MyServletContainerInitializer` μ `onStartup()` λ©μλ μ€νμ μν΄μλ μλΈλ¦Ώ μ»¨νμ΄λκ° μ΄ ν΄λμ€λ₯Ό μΈμνλ κ²μ΄ λ¨Όμ μ΄λ€. μ΄λ₯Ό μν μ€μ μ ν΄λμ€ν¨μ€μ `src/main/resources/META-INF/services` μ `javax.servlet.ServletContainerInitializer` νμΌμ μμ±ν΄, `core.web.MyServletContainerInitializer` μ μΆκ°νλ€.

μ΄μ  `web.xml` μμ΄λ κ°λ°μ΄ κ°λ₯ν μνκ° λμμΌλ, νλμ½λ©μΌλ‘ κ΅¬νλμ΄ μλ ν¨ν€μ§ μ΄λ¦μ `WebApplicationInitializer` μ λν κ΅¬νμ²΄λ₯Ό λ§λ€μ΄ κ΅¬ν κ°λ₯νλ€.

```java
public class MyWebApplicationInitializer implements WebApplicationInitializer {
    private static final Logger log = LoggerFactory.getLogger(MyWebApplicationInitializer.class);

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher", new DispatcherServlet("next"));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");

        log.info("Start MyWebApplication Initializer");
    }
}
```

- `MyWebApplicationInitializer` μμ `DispatcherServlet` μ μ§μ  μμ±ν΄ λ±λ‘(`LoadOnStartup` , `Mapping` μμ± λν λ±λ‘) `DispatcherServlet` μ `@WebServlet` annotation μ€μ μ λμ΄μ νμμλ€.

```java
public class DispatcherServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Logger logger = LoggerFactory.getLogger(DispatcherServlet.class);

    private List<HandlerMapping> mappings = Lists.newArrayList();
    private List<HandlerAdapter> handlerAdapters = Lists.newArrayList();
    private Object[] basePackages;
    
    public DispatcherServlet(Object... basePackages) {
        this.basePackages = basePackages;
    }
    
    @Override
    public void init() throws ServletException {
        AnnotationHandlerMapping ahm = new AnnotationHandlerMapping(basePackages);
        ahm.initialize();
        mappings.add(ahm);
        handlerAdapters.add(new HandlerExecutionHandlerAdapter());
    }
    ...

}
```

- `init()` λ©μλμμ `AnnotationHandlerMapping` κ³Ό μ§μ μ μΈ μμ‘΄κ΄κ³λ₯Ό κ°μ§λ κ²μ νμΈν  μ μλ€. μ΄λν DIλ₯Ό ν΅ν΄ μμ‘΄κ΄κ³λ₯Ό λμ¨νκ² κ°μ§λλ‘ λ³κ²½ν΄ νμ₯ κ°λ₯νλλ‘ κ°μ ν  μ μλ€.
  - μμ±μμ `HandlerMapping` μ μΈμλ‘ μ λ¬ν  μ μλλ‘ λ¦¬ν©ν λ§νλ€.

```java
public class DispatcherServlet extends HttpServlet {
    ...

    private HandlerMapping hm;

    public DispatcherServlet(HandlerMapping hm) {
        this.hm = hm;
    }

    @Override
    public void init() throws ServletException {
        mappings.add(hm);
        handlerAdapters.add(new HandlerExecutionHandlerAdapter());
    }
    ...

}
```

- `DispatcherServlet` μ΄ μ΄λ `HandlerMapping` κ΅¬νμ²΄μ μμ‘΄κ΄κ³λ₯Ό κ°μ§ κ²μΈμ§λ `DispatcherServlet` λ₯Ό μμ±νλ `MyApplicationInitializer` κ° κ²°μ νλ€.

```java
public class MyWebApplicationInitializer implements WebApplicationInitializer {
    private static final Logger log = LoggerFactory.getLogger(MyWebApplicationInitializer.class);

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationHandlerMapping ahm = new AnnotationHandlerMapping("next");
        ahm.initialize();
        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher", new DispatcherServlet(ahm));
        ...

    }
}
```

### π§ @Component annotation μ§μ
**λλ²μ§Έ μ΄μ**<br/>
: `ClasspathBeanDefinition` ν΄λμ€μ `@Component` annotation μ€μ λ§ μΆκ°νλ©΄ ν΄κ²°μ΄ κ°λ₯νλ€. 

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface Component {
    String value() default "";
}
```

μ΄μ  μΆκ°ν annotationμ `ClasspathBeanDefinitionScanner` μ `doScan()` λ©μλλ‘ μ°Ύμ μ μλλ‘ μΆκ°νλ€.

```java
public class ClasspathBeanDefinitionScanner {
    public void doScan(Object... basePackages) {
        Reflections reflections = new Reflections(basePackages);
        Set<Class<?>> beanClasses = getTypesAnnotatedWith(reflections, Controller.class, Service.class, Repository.class, Component.class);
        for (Class<?> clazz : beanClasses) {
            beanDefinitionRegistry.registerBeanDefinition(clazz, new BeanDefinition(clazz));
        }
    }
}
```

μ΄μ  μΆκ°ν annotationμ νμ©ν΄ `JdbcTemplate` μ λΉμΌλ‘ λ±λ‘ κ°λ₯νλλ‘ μ€μ  ν κ° DAOμμ `JdbcTemplate` μ DIλ‘ μ¬μ©νλλ‘ λ¦¬ν©ν λ§νλ€.

```java
@Component
public class JdbcTemplate {
    ...

}

@Repository
public class JdbcQuestionDao implements QuestionDao {
    private JdbcTemplate jdbcTemplate;
    
    @Inject
    public JdbcQuestionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    ...

}

@Repository
public class JdbcAnswerDao implements AnswerDao {
    private JdbcTemplate jdbcTemplate;

    @Inject
    public JdbcAnswerDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    ...

}
```

μλ²λ₯Ό μμνλ©΄ `JdbcTemplate` μ΄ `"next"` ν¨ν€μ§κ° μλ `"core"` ν¨ν€μ§ μλμ μμ΄ μΈμνμ§ λͺ»ν΄ μλ¬κ° λ°μνλ€.
- `MyWebApplicationInitializer` μμ μ΄λ₯Ό μΈμνλλ‘ `AnnotationHandlerMapping` μ `"core"` λ₯Ό μΆκ°ν΄ μ λ¬νλ€.

```java
public class MyWebApplicationInitializer implements WebApplicationInitializer {
    private static final Logger log = LoggerFactory.getLogger(MyWebApplicationInitializer.class);

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationHandlerMapping ahm = new AnnotationHandlerMapping("core", "next");
        ...

    }
}
```

---

## π© μΈλΆ λΌμ΄λΈλ¬λ¦¬ ν΄λμ€λ₯Ό λΉμΌλ‘ λ±λ‘νκΈ°
### π§ μκ΅¬μ¬ν­
κ°μ₯ μ’μ λ°©λ²μ κ°λ°μκ° μ§μ  λΉμ μμ±ν΄ κ΄λ¦¬ν  μ μλ λ³λμ μ€μ  νμΌμ λ§λλ κ²μ΄λ€.
- μλ₯Ό λ€μ΄, μ€μ  νμΌμ λΉ μΈμ€ν΄μ€λ₯Ό μμ±νλ λ©μλλ₯Ό κ΅¬νν΄λκ³ , annotationμΌλ‘ μ€μ νλ€.
- DI νλ μμν¬λ μ΄ μ€μ  νμΌμ μ½μ΄ `BeanFactory` μ λΉμΌλ‘ μ μ₯ν  μ μλ€λ©΄ `ClasspathBeanDefinitionScanner` λ₯Ό ν΅ν΄ λ±λ‘ν λΉκ³Ό κ°μ μ μ₯μμμ κ΄λ¦¬ν  μ μλ€.

annotationμ μ΄μ©ν΄ λͺ¨λ  μ€μ μ κ΄λ¦¬νκ³  κΈ°λ³Έ ν¨ν€μ§ μ€μ  λν μμ±νλ μ€μ  νμΌμμ κ΄λ¦¬νλλ‘ λ¦¬ν©ν λ§νλ€.

```java
@Configuration
@ComponentScan({"next", "core"})
public class MyConfiguration {
    @Bean
    public DataSource dataSource() {
        BasicDataSource ds = new BasicDataSource();
        ds.setDriverClassName("org.h2.Driver");
        ds.setUrl("jdbc:h2:~/jwp-basic;AUTO_SERVER=TRUE");
        ds.setUsername("sa");
        ds.setPassword("");
        return ds;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```

- μλ° ν΄λμ€κ° "μ€μ  νμΌ"μ΄λΌλ νμλ `@Configuration` annotationμ μμ±ν΄ μ¬μ©νλ€.
- κ° λ©μλμμ μμ±νλ μΈμ€ν΄μ€κ° `BeanFactory` μ λΉμΌλ‘ λ±λ‘νλΌλ μ€μ μ `Bean` annotationμ μμ±ν΄ μ¬μ©νλ€.
- `ClasspathBeanDefinitionScanner` μμ μ¬μ©ν  κΈ°λ³Έ ν¨ν€μ§μ λν μ€μ μ νλ μ½λ©νλλ° μ΄λ₯Ό μ€μ  νμΌμμ `@ComponentScan` annotationμ μ¬μ©ν΄ μ€μ νλλ‘ μ§μνλ€.
- `@Configuration` μ€μ  νμΌμ ν΅ν΄ λ±λ‘ν λΉκ³Ό `ClasspathBeanDefinitionScanner` λ₯Ό ν΅ν΄ λ±λ‘ν λΉ κ°μ DIκ° κ°λ₯ν΄μΌ νλ€.

### π§ 1λ¨κ³ ννΈ
λ°λ‘ κ΅¬νμ μμνκΈ°λ³΄λ€ μκ΅¬μ¬ν­μ νμ€νΈν  μ μλ λ¨μ νμ€νΈλ₯Ό λ¨Όμ  κ΅¬ννλ€. 
- λ¨Όμ  μ€μ  νμΌμμ μ¬μ©ν  annotationμ μΆκ°νλ€.
  - `ComponentScan` μ λ°°μ΄μ κ°μΌλ‘ μ λ¬ν  μ μλλ‘ `String[]` νλλ₯Ό κ°μ§λ€.

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ComponentScan {
    String[] value() default {};
    String[] basePackages() default {};
}

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface Configuration {
}

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Bean {
}
```

μ΄ λ¬Έμ λ₯Ό ν΄κ²°νλ €λ©΄ `@Configuration` μ€μ  νμΌμ μ½μ΄ `BeanFactory` μ `BeanDefinition` μ λ±λ‘νλ μ­ν μ μνν  ν΄λμ€κ° νμνλ€. (`AnnotatedBeanDefinitionReader`)
- `@Configuration` μ€μ λ ν΄λμ€μμ `@Bean` μ€μ λ λ©μλλ₯Ό μ°Ύλλ€.
- `BeanFactory` μ λ±λ‘ν  λΉμ **`@Bean` λ©μλμ λ°ν κ°μ ν΄λΉνλ ν΄λμ€**μ΄λ€.
- λ©μλμ λ°ν ν΄λμ€μ ν΄λΉνλ `BeanDefinition` μ μμ±ν ν `BeanFactory` μ λ±λ‘νλ€.

> μ΄λ κ³ λ €ν΄μΌ νλ μ μ λΉ μΈμ€ν΄μ€ μμ±μ μν΄ **`@Bean` μ€μ λ λ©μλ(λ¦¬νλ μμ `Method`)μ μ λ³΄κ° νμ**νλ€λ κ²μ΄λ€. λ°λΌμ, κΈ°μ‘΄μ `BeanDefinition` μ μμνλ `AnnotatedBeanDefinition` μ μΆκ°ν ν λ©μλ μ λ³΄κΉμ§ μ λ¬νλ€. 

μ΄ν κ°μ₯ μ€μν `BeanFactory` μ `getBean()` λ©μλλ₯Ό κ΅¬ννλ€.
- μΈμλ‘ μ λ¬λλ λΉ ν΄λμ€μ ν΄λΉνλ `BeanDefinition` μ΄ `AnnotatedBeanDefinition` μΈμ€ν΄μ€μΌ κ²½μ° κΈ°μ‘΄κ³Ό λ€λ₯Έ λ°©μμΌλ‘ λΉ μΈμ€ν΄μ€λ₯Ό μμ±νλ€.

λ§μ§λ§μΌλ‘, `ApplicationContext` κ° `ClasspathBeanDefinitionScanner` μμ μ¬μ©ν  κΈ°λ³Έ ν¨ν€μ§ μ λ³΄λ₯Ό λ°λ κ²μ΄ μλ `@Configuration` μ€μ λ μ€μ  νμΌμ μΈμλ‘ λ°λλ‘ μμ ν ν `@ComponentScan` κ°μ κ΅¬ν΄ ν¨ν€μ§ μ λ³΄λ₯Ό μ λ¬νκ³ , `AnnotatedBeanDefinitionReader` λ₯Ό ν΅ν΄ μ€μ  νμΌμ λ±λ‘λ `@Bean` μ `BeanFactory` μ λ±λ‘νλλ‘ νλ€.

### π§ 2λ¨κ³ ννΈ
**λ¨μ νμ€νΈ μ½λ λ§λ€κΈ°**<br/>
λ¨Όμ  νμ€νΈμ© μ€μ  νμΌμ μΆκ°νλ€. (`src/test/java`)

```java
@Configuration
public class ExampleConfig {
    @Bean
    public DataSource dataSource() {
        BasicDataSource ds = new BasicDataSource();
        ds.setDriverClassName("org.h2.Driver");
        ds.setUrl("jdbc:h2:~/jwp-basic;AUTO_SERVER=TRUE");
        ds.setUsername("sa");
        ds.setPassword("");
        return ds;
    }
}
```

- ν΄λΉ μ€μ  νμΌμ μ½μ΄ `BeanFactory` μ λ±λ‘ν ν `getBean()` μ ν΅ν΄ λΉμ μ°Ύμμ λ `null` μ¬λΆλ₯Ό νλ¨νλ νμ€νΈλ₯Ό μΆκ°νλ€.

## π μΆμ²
- **μλ° μΉ νλ‘κ·Έλλ° Next Step : νλμ© λ²κ²¨κ°λ μνκ»μ§ νμ΅λ²** - λ°μ¬μ±
- [java - Mavenμ μ¬μ©νλ JARμ "META-INF/services"ν΄λμ μ€μ  νμΌμ ν¬ν¨μν€λ λ°©λ²](https://code-examples.net/ko/q/10b82e9)